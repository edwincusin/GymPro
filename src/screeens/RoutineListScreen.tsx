import { Text, StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRoutine } from '../context/RoutineContext';


export default function RoutineListScreen({ navigation }: any) {

  const { routines, deleteRoutine } = useRoutine();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Rutinas</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRoutine')}
        >
          <Ionicons name='add' size={26} color='#fff' />
        </TouchableOpacity>
      </View>
      <View style={styles.listWrapper}>
        <FlatList
          data={routines}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>

                {/* Información de la rutina */}
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.metaRow}>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.muscleGroup}</Text>
                    </View>
                    <Text style={styles.duration}>{item.duration} min</Text>
                  </View>
                </View>

                {/* Acciones sobre la rutina */}
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('AddRoutine', { id: item.id })}
                  >
                    <Ionicons name='pencil' size={20} color='tomato' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('ChestDetail', { id: item.id })}
                  >
                    <Ionicons name='eye' size={20} color='#3b82f6' />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => deleteRoutine(item.id)}
                  >
                    <Ionicons name='trash' size={20} color='#ef4444' />
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
  // Fondo general de la pantalla
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },

  // Encabezado: título a la izquierda, botón a la derecha
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  // Título de la pantalla
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  // Botón circular de agregar rutina
  addButton: {
    backgroundColor: '#3b82f6',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  // (agrega aquí los estilos de card, infoContainer, etc. que ya hicimos antes)

  listWrapper: {
    flex: 1,
    paddingHorizontal:10
  },
  // Tarjeta de cada rutina
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  // Contenedor de la info (nombre + meta)
  infoContainer: {
    flex: 1,
    marginRight: 8,
  },

  // Nombre de la rutina
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 6,
  },

  // Fila con el grupo muscular y la duración
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // Chip/badge del grupo muscular
  badge: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
  },

  // Duración en texto simple
  duration: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },

  // Contenedor de los 3 íconos de acción
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  // Fondo circular de cada botón de acción
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
});