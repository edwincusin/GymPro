import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoutine } from '../context/RoutineContext';
import { Ionicons } from '@expo/vector-icons';

const OPCIONES_GRUPO = ['Pecho', 'Espalda', 'Piernas'];

export default function AddRoutineScreen({ route, navigation }: any) {

  const { addRoutine, updateRoutine, routines } = useRoutine();
  const [name, setName] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [duracion, setDuracion] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [guardando, setGuardando] = useState(false);

  const idToEdit: number | undefined = route.params?.id;

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

  const validar = (): boolean => {
    const nombreLimpio = name.trim();
    const grupoLimpio = grupoMuscular.trim();

    if (!nombreLimpio || !grupoLimpio || !duracion.trim()) {
      Alert.alert("ERROR", "Todos los campos son obligatorios para continuar");
      return false;
    }

    const duracionNumber = parseInt(duracion, 10);

    if (isNaN(duracionNumber)) {
      Alert.alert("ERROR", "El campo duración debe ser un número entero");
      return false;
    }

    // Validación de rango requerida por la Actividad 2
    if (duracionNumber < 10 || duracionNumber > 180) {
      Alert.alert("ERROR", "La duración debe estar entre 10 y 180 minutos");
      return false;
    }

    return true;
  }

  const handleSave = async () => {
    if (!validar()) {
      return; // No navega ni cierra el formulario mientras haya errores
    }

    const nombreLimpio = name.trim();
    const grupoLimpio = grupoMuscular.trim();
    const duracionNumber = parseInt(duracion, 10);

    setGuardando(true);

    try {
      if (idToEdit) {
        await updateRoutine(idToEdit, {
          name: nombreLimpio,
          duration: duracionNumber,
          muscleGroup: grupoLimpio,
        });
      } else {
        await addRoutine({
          name: nombreLimpio,
          duration: duracionNumber,
          muscleGroup: grupoLimpio,
        });
      }

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        navigation.goBack();
      }, 1200);

    } catch (error) {
      Alert.alert("ERROR", "No se pudo guardar la rutina. Intenta de nuevo.");
      console.log("Error al guardar rutina:", error);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >

        <ScrollView contentContainerStyle={styles.scrollContent}>

          <View style={styles.headerIcon}>
            <View style={styles.iconCircle}>
              <Ionicons name='barbell-outline' size={32} color="#3b82f6" />
            </View>
          </View>

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
                editable={!guardando}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Grupo Muscular</Text>
              <View style={styles.chipRow}>
                {OPCIONES_GRUPO.map(opcion => (
                  <TouchableOpacity
                    key={opcion}
                    style={[styles.chip, grupoMuscular === opcion && styles.chipActive]}
                    onPress={() => setGrupoMuscular(opcion)}
                    disabled={guardando}
                  >
                    <Text style={[styles.chipText, grupoMuscular === opcion && styles.chipTextActive]}>
                      {opcion}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Duración (minutos)</Text>
              <TextInput
                style={styles.input}
                value={duracion}
                onChangeText={setDuracion}
                keyboardType='number-pad'
                placeholder="Entre 10 y 180"
                placeholderTextColor="#9ca3af"
                editable={!guardando}
              />
            </View>

            <TouchableOpacity
              style={[styles.saveButton, guardando && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={guardando}
            >
              <Ionicons name='save' size={20} color="#fff" />
              <Text style={styles.saveButtonText}>
                {guardando ? 'Guardando...' : 'Guardar'}
              </Text>
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
  container: {
    flex: 1,
    backgroundColor: '#14141C',
  },
  headerIcon: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 77, 77, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  card: {
    backgroundColor: '#1E1E28',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2E2E3A',
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9A93A8',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2E2E3A',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#FFFFFF',
    backgroundColor: '#14141C',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    gap: 8,
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonDisabled: {
    backgroundColor: '#5A2E2E',
    shadowOpacity: 0,
    elevation: 0,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  toast: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22C55E',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#14141C',
    borderWidth: 1,
    borderColor: '#2E2E3A',
  },
  chipActive: {
    backgroundColor: '#FF4D4D',
    borderColor: '#FF4D4D',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9A93A8',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
});