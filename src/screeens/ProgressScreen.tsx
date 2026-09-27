import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutine } from '../context/RoutineContext';

export default function ProgressScreen() {
  const { routines, cargando } = useRoutine();

  const totalRutinas = routines.length;
  const duracionTotal = routines.reduce((suma, r) => suma + r.duration, 0);
  const duracionPromedio = totalRutinas > 0 ? Math.round(duracionTotal / totalRutinas) : 0;

  const conteoPorGrupo = routines.reduce((acc, r) => {
    acc[r.muscleGroup] = (acc[r.muscleGroup] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const grupoConMasRutinas = Object.entries(conteoPorGrupo)
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  const rutinaDestacada = routines.find(r => r.featured);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Progreso</Text>
        <Text style={styles.subtitle}>Resumen de tu entrenamiento</Text>

        {cargando ? (
          <Text style={styles.loadingText}>Cargando datos...</Text>
        ) : (
          <>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,77,77,0.15)' }]}>
                  <Ionicons name="clipboard-outline" size={20} color="#FF4D4D" />
                </View>
                <Text style={styles.statValue}>{totalRutinas}</Text>
                <Text style={styles.statLabel}>Total rutinas</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(96,165,250,0.15)' }]}>
                  <Ionicons name="time-outline" size={20} color="#60A5FA" />
                </View>
                <Text style={styles.statValue}>{duracionTotal} min</Text>
                <Text style={styles.statLabel}>Duración total</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(34,197,94,0.15)' }]}>
                  <Ionicons name="speedometer-outline" size={20} color="#22C55E" />
                </View>
                <Text style={styles.statValue}>{duracionPromedio} min</Text>
                <Text style={styles.statLabel}>Promedio</Text>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.iconCircle, { backgroundColor: 'rgba(255,199,0,0.15)' }]}>
                  <Ionicons name="body-outline" size={20} color="#FFC700" />
                </View>
                <Text style={styles.statValue}>{grupoConMasRutinas}</Text>
                <Text style={styles.statLabel}>Grupo top</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Rutina destacada</Text>
            {rutinaDestacada ? (
              <View style={styles.featuredCard}>
                <View style={styles.featuredIconCircle}>
                  <Ionicons name="star" size={22} color="#FFC700" />
                </View>
                <View style={{ marginLeft: 14, flex: 1 }}>
                  <Text style={styles.featuredName}>{rutinaDestacada.name}</Text>
                  <Text style={styles.featuredMeta}>
                    {rutinaDestacada.muscleGroup} · {rutinaDestacada.duration} min
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.emptyFeatured}>
                <Ionicons name="star-outline" size={22} color="#9A93A8" />
                <Text style={styles.emptyFeaturedText}>
                  Aún no has marcado ninguna rutina como destacada
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#14141C' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', color: '#FFFFFF' },
  subtitle: { fontSize: 13, color: '#9A93A8', marginTop: 2, marginBottom: 24 },
  loadingText: { color: '#9A93A8', textAlign: 'center', marginTop: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%', backgroundColor: '#1E1E28', borderRadius: 16, padding: 16,
    alignItems: 'flex-start', borderWidth: 1, borderColor: '#2E2E3A',
  },
  iconCircle: {
    width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  statValue: { fontSize: 19, fontWeight: '800', color: '#FFFFFF' },
  statLabel: { fontSize: 12, color: '#9A93A8', marginTop: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', marginTop: 28, marginBottom: 12 },
  featuredCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E1E28',
    borderWidth: 1.5, borderColor: '#FFC700', borderRadius: 16, padding: 16,
  },
  featuredIconCircle: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,199,0,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  featuredName: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  featuredMeta: { fontSize: 13, color: '#9A93A8', marginTop: 2 },
  emptyFeatured: {
    backgroundColor: '#1E1E28', borderRadius: 16, padding: 20, alignItems: 'center', gap: 8,
    borderWidth: 1, borderColor: '#2E2E3A',
  },
  emptyFeaturedText: { color: '#9A93A8', fontSize: 13, textAlign: 'center' },
});