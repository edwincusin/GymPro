import React, { createContext, useState, useContext, ReactNode } from "react";

//DEFINIR DEL TIPO DE RUTINA
export type Routine = {
    id: string;
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
    updateRoutine: (id: string, routine: Omit<Routine, 'id' | 'createAt'>) => void;
    deleteRoutine: (id: string) => void;
}

// Se crea el contexto. Se inicializa en 'undefined' para poder detectar
// si alguien intenta usarlo fuera del Provider
const RoutineContext = createContext<RoutineContextType | undefined>(undefined);


// Componente "proveedor - o provider": envuelve a la app (o parte de ella) y le da acceso a las funciones
export function RoutineProvider({ children }: { children: ReactNode }) {

    // Estado local que guarda el array de productos
    const [routines, setRoutines] = useState<Routine[]>([
        {
            id: '1',
            name: 'Pecho y Tríceps',
            muscleGroup: 'Pecho',
            duration: 45,
            createAt: new Date().toLocaleDateString(),
        },
        {
            id: '2',
            name: 'Espalda y Bíceps',
            muscleGroup: 'Espalda',
            duration: 50,
            createAt: new Date().toLocaleDateString(),
        },
        {
            id: '3',
            name: 'Pierna Completa',
            muscleGroup: 'Piernas',
            duration: 60,
            createAt: new Date().toLocaleDateString(),
        },
    ]);

    // CREAR UNA RUTINA sin id y createAt ya que son automaticos
    const addRoutine = (routine: Omit<Routine, 'id' | 'createAt'>) => {
        const newRoutine = {
            ...routine,
            id: Date.now().toString(),
            createAt: new Date().toLocaleDateString(),
        }
        setRoutines([...routines, newRoutine]);
    }

    // ACTUALIZAR RUTINA 
    const updateRoutine = (id: string, routineEdit: Omit<Routine, 'id' | 'createAt'>) => {
        setRoutines(routines.map(r => (r.id === id ? { ...r, ...routineEdit } : r)))
    }

    //ELIMINAR RUTINA 
    const deleteRoutine = (id: string) => {
        setRoutines(routines.filter(r => (r.id !== id)))
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
