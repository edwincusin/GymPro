import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screeens/RoutineDetailScreen';
import { RoutineProvider } from './src/context/RoutineContext';
import AddRoutineScreen from './src/screeens/AddRoutineScreen';

//DICCIONARIO
export type RootStackParamList = {
  MainDrawer: undefined;
  Detail: undefined
  AddRoutine: { id?: string | undefined }

}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <RoutineProvider>
      <NavigationContainer>
        <StatusBar style='light' />

        <Stack.Navigator initialRouteName='MainDrawer'>
          <Stack.Screen
            name='MainDrawer'
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Detail'
            component={RoutineDetailScreen}
            options={{ headerShown: true, title: 'Detalle de Rutina' }}
          />
          <Stack.Screen
            name='AddRoutine'
            component={AddRoutineScreen}
            options={({route})=>{
              return {title:route.params?.id?'Editar Rutina':"Nueva rutina"}
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RoutineProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
