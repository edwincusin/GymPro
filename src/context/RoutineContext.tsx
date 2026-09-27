import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

//DEFINIR DEL TIPO DE RUTINA
export type Routine = {
    id: number;
    name: string;
    muscleGroup: string;
    duration: number;
    createAt: string;
}


// Definición del tipo del contexto: qué datos y funciones estarán disponibles
// para cualquier componente que consuma este contexto
type RoutineContextType = {
    routines: Routine[];
    addRoutine: (routine: Omit<Routine, 'id' | 'createAt'>) => void;
    updateRoutine: (id: number, routine: Omit<Routine, 'id' | 'createAt'>) => void;
    deleteRoutine: (id: number) => void;
}

// Se crea el contexto. Se inicializa en 'undefined' para poder detectar
// si alguien intenta usarlo fuera del Provider
const RoutineContext = createContext<RoutineContextType | undefined>(undefined);


// Componente "proveedor - o provider": envuelve a la app (o parte de ella) y le da acceso a las funciones
export function RoutineProvider({ children }: { children: ReactNode }) {

    const dataBase = useSQLiteContext();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [cargando, setCargando] = useState(false);

    const cargarRoutines = useCallback(async () => {
        setCargando(true);
        try {
            const resultado = await dataBase.getAllAsync<Routine>(
                'SELECT * FROM routines ORDER BY id DESC'
            );
            setRoutines(resultado);
        } catch (error) {
            console.log("Error al cargar rutinas desde el context:", error);
        } finally {
            setCargando(false);
        }
    }, [dataBase]);

    // Carga inicial al montar el Provider
    useEffect(() => {
        cargarRoutines();
    }, [cargarRoutines]);

    const addRoutine = async (routine: Omit<Routine, 'id' | 'createAt'>) => {
        const createAt = new Date().toLocaleDateString();
        try {
            await dataBase.runAsync(
                'INSERT INTO routines (name, muscleGroup, duration, createAt) VALUES (?,?,?,?)',
                [routine.name, routine.muscleGroup, routine.duration, createAt]
            );
            await cargarRoutines();
        } catch (error) {
            console.log("Error al agregar rutina desde el context:", error);
        }
    }

    const updateRoutine = async (id: number, routineEdit: Omit<Routine, 'id' | 'createAt'>) => {
        try {
            await dataBase.runAsync(
                'UPDATE routines SET name=?, muscleGroup=?, duration=? WHERE id=?',
                [routineEdit.name, routineEdit.muscleGroup, routineEdit.duration, id]
            );
            await cargarRoutines();
        } catch (error) {
            console.log("Error al actualizar rutina desde el context :", error);
        }
    }

    const deleteRoutine = async (id: number) => {
        try {
            await dataBase.runAsync('DELETE FROM routines WHERE id=?', [id]);
            await cargarRoutines();
        } catch (error) {
            console.log("Error al eliminar rutina desde el context:", error);
        }
    }


    // El Provider expone el estado y las funciones a todos los "children"
    // (todo componente hijo podrá leer/modificar etc)
    return (
        <RoutineContext.Provider value={{ routines, addRoutine, deleteRoutine, updateRoutine }}>
            {children}
        </RoutineContext.Provider>
    )

}

// Hook personalizado para consumir el contexto de forma segura
export function useRoutine() {
    const context = useContext(RoutineContext)
    if (!context) {
        throw new Error("useRoutine debe ser usado dentro de un RoutineProvider")

    }
    return context;
}
