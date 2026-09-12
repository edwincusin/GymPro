import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProgressScreen from "../screeens/ProgressScreen";
import RoutineListScreen from "../screeens/RoutineListScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName: any = "list"

                if (route.name === "ProgresoTab") {
                    iconName = focused ? 'trophy' : 'trophy';
                }
                if (route.name === "RutinasTab") {
                    iconName = focused ? 'clipboard' : 'clipboard-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor:'green',
            tabBarInactiveTintColor:'gray'

        })}>
            <Tab.Screen
                name='ProgresoTab'
                component={ProgressScreen}
                options={{ title: 'Progreso' }}
            />
            <Tab.Screen
                name='RutinasTab'
                component={RoutineListScreen}
                options={{ title: 'Rutinas' }}
            />
        </Tab.Navigator>
    );
}