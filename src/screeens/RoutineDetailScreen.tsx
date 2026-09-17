import {  Text,StyleSheet, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoutine } from '../context/RoutineContext';

export default function RoutineDetailScreen({route}:any) {
  
  const idToView=route.params?.id;
  const {routines}=useRoutine();

  const routineFound=routines.find(r=>(r.id==idToView));
if (!routineFound) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.notFound}>Rutina no encontrada</Text>
    </SafeAreaView>
  );
}

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.card}>

      {/* Encabezado con nombre y badge del grupo muscular */}
      <View style={styles.headerSection}>
        <Text style={styles.name}>{routineFound.name}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{routineFound.muscleGroup}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Fila de detalle: ID */}
      <View style={styles.row}>
        <Text style={styles.label}>Identificador</Text>
        <Text style={styles.value}>{routineFound.id}</Text>
      </View>

      {/* Fila de detalle: duración */}
      <View style={styles.row}>
        <Text style={styles.label}>Duración</Text>
        <Text style={styles.value}>{routineFound.duration} min</Text>
      </View>

      {/* Fila de detalle: fecha de creación */}
      <View style={styles.row}>
        <Text style={styles.label}>Fecha de creación</Text>
        <Text style={styles.value}>{routineFound.createAt}</Text>
      </View>

    </View>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  // Fondo general de la pantalla
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    padding: 20,
    justifyContent: 'center',
  },

  // Mensaje cuando no se encuentra la rutina
  notFound: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Tarjeta blanca contenedora del detalle
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  // Sección superior: nombre + badge
  headerSection: {
    marginBottom: 16,
  },

  // Nombre de la rutina
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  // Chip/badge del grupo muscular
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3b82f6',
  },

  // Línea divisoria
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
  },

  // Fila de cada dato
  row: {
    marginBottom: 16,
  },

  // Etiqueta pequeña (ej: "Duración")
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 3,
  },

  // Valor del dato
  value: {
    fontSize: 15,
    color: '#1f2937',
    lineHeight: 21,
  },
});