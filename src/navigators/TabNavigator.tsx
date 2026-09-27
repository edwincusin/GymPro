import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import ProgressScreen from "../screeens/ProgressScreen";
import RoutineListScreen from "../screeens/RoutineListScreen";

const Tab = createBottomTabNavigator();

// Paleta (coherente con el resto de la app)
const COLORS = {
  background: '#14141C',
  card: '#1E1E28',
  border: '#2E2E3A',
  accent: '#FF4D4D',
  accentSoft: 'rgba(255, 77, 77, 0.15)',
  textActive: '#FFFFFF',
  textInactive: '#9A93A8',
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: COLORS.textActive,
        tabBarInactiveTintColor: COLORS.textInactive,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'list';

          if (route.name === 'ProgresoTab') {
            iconName = 'trophy';
          }
          if (route.name === 'RutinasTab') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          }

          return (
            <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <Ionicons name={iconName} size={size - 2} color={focused ? COLORS.accent : color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="ProgresoTab"
        component={ProgressScreen}
        options={{ title: 'Progreso' }}
      />
      <Tab.Screen
        name="RutinasTab"
        component={RoutineListScreen}
        options={{ title: 'Rutinas' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    height: 68,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    paddingTop: 8,
  },
  tabItem: {
    paddingTop: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: COLORS.accentSoft,
  },
});