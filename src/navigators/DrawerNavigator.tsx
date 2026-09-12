
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screeens/SettingsScreen";
import { Ionicons } from "@expo/vector-icons";


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="MiEntrenamiento">
            <Drawer.Screen
                name='Configuracion'
                component={SettingsScreen}
                options={{
                    title: 'Configuración',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />

                    )
                }}
            />
            <Drawer.Screen
                name='MiEntrenamiento'
                component={TabNavigator}
                options={{
                    title: 'Mi Entrenamiento',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="barbell" size={size} color={color} />

                    )

                }}

            />


        </Drawer.Navigator>
    );
}