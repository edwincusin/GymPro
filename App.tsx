import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light'/>
      <Stack.Navigator initialRouteName='TabNavigator'>
        <Stack.Screen 
          name='TabNavigator'
          component={TabNavigator}
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
