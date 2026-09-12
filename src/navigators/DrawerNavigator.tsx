
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import SettingsScreen from "../screeens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="MiEntrenamiento">
            <Drawer.Screen
                name='Configuracion'
                component={SettingsScreen}
                options={{ title: 'Configuración' }}
            />
            <Drawer.Screen
                name='MiEntrenamiento'
                component={TabNavigator}
                options={{ title: 'Mi Entrenamiento' }}
            />


        </Drawer.Navigator>
    );
}