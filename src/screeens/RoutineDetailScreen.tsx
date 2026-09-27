import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutine } from '../context/RoutineContext';

export default function RoutineDetailScreen({ route }: any) {

  const idToView: number = route.params?.id;
  const { routines } = useRoutine();

  const routineFound = routines.find(r => r.id === idToView);

  if (!routineFound) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundBox}>
          <Ionicons name="alert-circle-outline" size={40} color="#9A93A8" />
          <Text style={styles.notFound}>Rutina no encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>

        {/* Ícono principal grande */}
        <View style={styles.iconHeader}>
          <View style={styles.iconCircle}>
            <Ionicons name="barbell-outline" size={30} color="#FF4D4D" />
          </View>
        </View>

        <View style={styles.headerSection}>
          <View style={styles.nameRow}>
            {routineFound.featured && (
              <Ionicons name="star" size={18} color="#FFC700" style={{ marginRight: 6 }} />
            )}
            <Text style={styles.name}>{routineFound.name}</Text>
          </View>
          <View style={styles.badge}>
            <Ionicons name="body-outline" size={13} color="#FF4D4D" />
            <Text style={styles.badgeText}>{routineFound.muscleGroup}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.rowIconCircle}>
            <Ionicons name="finger-print-outline" size={16} color="#60A5FA" />
          </View>
          <View>
            <Text style={styles.label}>Identificador</Text>
            <Text style={styles.value}>#{routineFound.id}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.rowIconCircle}>
            <Ionicons name="time-outline" size={16} color="#22C55E" />
          </View>
          <View>
            <Text style={styles.label}>Duración</Text>
            <Text style={styles.value}>{routineFound.duration} min</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.rowIconCircle}>
            <Ionicons name="calendar-outline" size={16} color="#FFC700" />
          </View>
          <View>
            <Text style={styles.label}>Fecha de creación</Text>
            <Text style={styles.value}>{routineFound.createAt}</Text>
          </View>
        </View>

        {routineFound.featured && (
          <View style={styles.featuredNote}>
            <Ionicons name="star" size={14} color="#FFC700" />
            <Text style={styles.featuredNoteText}>Esta es tu rutina destacada</Text>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14141C',
    padding: 20,
    justifyContent: 'center',
  },
  notFoundBox: {
    alignItems: 'center',
    gap: 12,
  },
  notFound: {
    fontSize: 16,
    color: '#9A93A8',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1E1E28',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#2E2E3A',
  },
  iconHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 77, 77, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 77, 77, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF4D4D',
  },
  divider: {
    height: 1,
    backgroundColor: '#2E2E3A',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 18,
  },
  rowIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#14141C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9A93A8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 3,
  },
  value: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  featuredNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#2E2E3A',
  },
  featuredNoteText: {
    fontSize: 13,
    color: '#FFC700',
    fontWeight: '600',
  },
});