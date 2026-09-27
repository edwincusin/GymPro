import { Text, StyleSheet, FlatList, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutine } from '../context/RoutineContext';
import { useState } from 'react';

const OPCIONES_FILTRO = ['Todos', 'Pecho', 'Espalda', 'Piernas'];

export default function RoutineListScreen({ navigation }: any) {

  const { routines, deleteRoutine, setFeaturedRoutine } = useRoutine();
  const [filtro, setFiltro] = useState('Todos');

  let rutinasFiltradas = routines;

  if (filtro !== 'Todos') {
    rutinasFiltradas = routines.filter((rutina) => {
      return rutina.muscleGroup === filtro;
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mis Rutinas</Text>
          <Text style={styles.subtitle}>{routines.length} rutinas registradas</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRoutine')}
        >
          <Ionicons name='add' size={26} color='#fff' />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        style={styles.filterScroll}
      >
        {OPCIONES_FILTRO.map(opcion => (
          <TouchableOpacity
            key={opcion}
            style={[styles.filterChip, filtro === opcion && styles.filterChipActive]}
            onPress={() => setFiltro(opcion)}
          >
            <Text style={[styles.filterChipText, filtro === opcion && styles.filterChipTextActive]}>
              {opcion}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.listWrapper}>
        <FlatList
          data={rutinasFiltradas}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay rutinas para "{filtro}"</Text>
          }
          renderItem={({ item }) => {
            return (
              <View style={[styles.card, item.featured && styles.cardFeatured]}>

                <View style={styles.infoContainer}>
                  <View style={styles.nameRow}>
                    {item.featured && (
                      <Ionicons name="star" size={15} color="#FFC700" style={{ marginRight: 6 }} />
                    )}
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  </View>
                  <View style={styles.metaRow}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.muscleGroup}</Text>
                    </View>
                    <View style={styles.durationRow}>
                      <Ionicons name="time-outline" size={13} color="#9A93A8" />
                      <Text style={styles.duration}>{item.duration} min</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setFeaturedRoutine(item.id)}
                  >
                    <Ionicons
                      name={item.featured ? 'star' : 'star-outline'}
                      size={18}
                      color='#FFC700'
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('AddRoutine', { id: item.id })}
                  >
                    <Ionicons name='pencil' size={18} color='#FF4D4D' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('Detail', { id: item.id })}
                  >
                    <Ionicons name='eye' size={18} color='#60A5FA' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => deleteRoutine(item.id)}
                  >
                    <Ionicons name='trash' size={18} color='#EF4444' />
                  </TouchableOpacity>
                </View>

              </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#14141C' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16,
  },
  title: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.3 },
  subtitle: { fontSize: 13, color: '#9A93A8', marginTop: 2 },
  addButton: {
    backgroundColor: '#FF4D4D', width: 48, height: 48, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#FF4D4D', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 36,              // ← altura fija, en vez de dejarla implícita
    borderRadius: 20,
    backgroundColor: '#1E1E28',
    borderWidth: 1,
    borderColor: '#2E2E3A',
    justifyContent: 'center', // centra el texto verticalmente dentro del chip
  },
  filterChipActive: { backgroundColor: '#FF4D4D', borderColor: '#FF4D4D' },
  filterChipText: { fontSize: 13, fontWeight: '600', color: '#9A93A8' },
  filterChipTextActive: { color: '#FFFFFF' },
  listWrapper: { flex: 1, paddingHorizontal: 5 },
  emptyText: { textAlign: 'center', color: '#9A93A8', marginTop: 60, fontSize: 14 },
  card: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#1E1E28', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 12,
    borderWidth: 1, borderColor: '#2E2E3A',
  },
  cardFeatured: { borderColor: '#FFC700', borderWidth: 1.5 },
  infoContainer: { flex: 1, marginRight: 10 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 15, fontWeight: '700', color: '#FFFFFF', flexShrink: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  badge: { backgroundColor: 'rgba(255, 77, 77, 0.15)', paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#FF4D4D' },
  durationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  duration: { fontSize: 12, color: '#9A93A8', fontWeight: '500' },
  actionsContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  actionButton: {
    width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: '#14141C',
  },
  filterRow: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'flex-start',  // ← evita que los chips se estiren verticalmente
  },
  filterScroll: {
    maxHeight: 44,
    marginBottom: 14,
  },
});