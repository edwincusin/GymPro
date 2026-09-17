import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoutine } from '../context/RoutineContext';
import { Ionicons } from '@expo/vector-icons';

export default function AddRoutineScreen({ route, navigation }: any) {

    const { addRoutine, updateRoutine, routines } = useRoutine();
    const [name, setName] = useState('');
    const [grupoMuscular, setGrupoMuscular] = useState('');
    const [duracion, setDuracion] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const idToEdit = route.params?.id;

    useEffect(() => {
        if (idToEdit) {
            const routineFound = routines.find((r) => r.id === idToEdit);
            if (routineFound) {
                setName(routineFound.name);
                setGrupoMuscular(routineFound.muscleGroup);
                setDuracion(routineFound.duration.toString());
            }
        } else {
            setName('');
            setGrupoMuscular('');
            setDuracion('');
        }
    }, [idToEdit])

    const handleSave = () => {
        if (!name || !grupoMuscular || !duracion) {
            return Alert.alert("ERROR", "Todos los campos son obligatorios para continuar");
        }
        const duracionNumber = parseInt(duracion);
        if (isNaN(duracionNumber)) {
            return Alert.alert("ERROR", "El campo duracion debe ser un numero entero")
        }
        if (idToEdit) {
            updateRoutine(idToEdit, { name: name, duration: duracionNumber, muscleGroup: grupoMuscular })
        } else {
            addRoutine({ name: name, duration: duracionNumber, muscleGroup: grupoMuscular })
        }
        // Mostrar mensaje de éxito
        setShowSuccess(true);

        // Ocultarlo después de 2 segundos y luego volver atrás
        setTimeout(() => {
            setShowSuccess(false);
            navigation.goBack();
        }, 2000);
    }

    return (
        <SafeAreaView style={styles.container}>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                //keyboardShouldPersistTaps="handled"
                >

                    {/* Encabezado con ícono representativo */}
                    <View style={styles.headerIcon}>
                        <View style={styles.iconCircle}>
                            <Ionicons name='barbell-outline' size={32} color="#3b82f6" />
                        </View>
                        
                    </View>

                    {/* Tarjeta contenedora del formulario */}
                    <View style={styles.card}>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                autoFocus={true}
                                placeholder="Ej. Pecho y Tríceps"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Grupo Muscular</Text>
                            <TextInput
                                style={styles.input}
                                value={grupoMuscular}
                                onChangeText={setGrupoMuscular}
                                placeholder="Ej. Pecho"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Duración (minutos)</Text>
                            <TextInput
                                style={styles.input}
                                value={duracion}
                                onChangeText={setDuracion}
                                keyboardType='number-pad'
                                placeholder="45"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>

                        {/* Botón de guardar */}
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Ionicons name='save' size={20} color="#fff" />
                            <Text style={styles.saveButtonText}>Guardar</Text>
                        </TouchableOpacity>

                    </View>
                    {showSuccess && (
                        <View style={styles.toast}>
                            <Ionicons name="checkmark-circle" size={20} color="#fff" />
                            <Text style={styles.toastText}>Guardado con éxito</Text>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    // Fondo general de la pantalla
    container: {
        flex: 1,
        backgroundColor: '#f4f5f7',
        //padding: 20,
    },


    // Contenedor del encabezado con ícono
    headerIcon: {
        alignItems: 'center',
        marginBottom: 24,
    },

    // Círculo de fondo para el ícono
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

    // Título de la pantalla
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
    },

    // Tarjeta blanca que contiene el formulario
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 2,
    },

    // Agrupa la etiqueta con su input
    inputGroup: {
        marginBottom: 18,
    },

    // Etiqueta de cada campo
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
    },

    // Estilo base de los inputs
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: '#111827',
        backgroundColor: '#f9fafb',
    },

    // Botón de guardar
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b82f6',
        borderRadius: 10,
        paddingVertical: 14,
        marginTop: 8,
        gap: 8,
    },

    // Texto del botón de guardar
    saveButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
    },
    toast: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#16a34a',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 30,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },

    toastText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
});