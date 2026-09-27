import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View,Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screeens/RoutineDetailScreen';
import { RoutineProvider } from './src/context/RoutineContext';
import AddRoutineScreen from './src/screeens/AddRoutineScreen';
import { SQLiteProvider } from 'expo-sqlite';
import { Suspense } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initDatabase } from './src/dataBase/database';

//DICCIONARIO
export type RootStackParamList = {
  MainDrawer: undefined;
  Detail: undefined
  AddRoutine: { id?: number | undefined }

}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Suspense fallback={
      <SafeAreaView style={stylesCarga.container}>
        <View style={stylesCarga.card}>
          <ActivityIndicator size={'large'} color={'#FF6243'} />
          <Text style={stylesCarga.title}>Gympro</Text>
          <Text style={stylesCarga.subtitle}>Preparando tu base de datos...</Text>
        </View>
      </SafeAreaView>
    }>
    <SQLiteProvider  databaseName='gympro.db' onInit={initDatabase} useSuspense>
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
              return {title:route.params?.id?'Editar Rutina':"Nueva rutina", headerShown:true}
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RoutineProvider>
    </SQLiteProvider>
    </Suspense>
  );
}


const stylesCarga = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 28,
    backgroundColor: '#26232F',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3A2E42',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#9A93A8',
    textAlign: 'center',
  },
});