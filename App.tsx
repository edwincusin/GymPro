import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestDetailScreen from './src/screeens/ChestDetailScreen';

//DICCIONARIO
export type RootStackParamList={
  MainDrawer:undefined;
  ChestDetail:undefined
}

const Stack=createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light'/>

      <Stack.Navigator initialRouteName='MainDrawer'>
        <Stack.Screen 
          name='MainDrawer'
          component={DrawerNavigator}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name='ChestDetail'
          component={ChestDetailScreen}
          options={{headerShown:true, title:'ChestDetailScreen'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
