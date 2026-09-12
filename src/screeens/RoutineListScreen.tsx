import {  Text,StyleSheet, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoutineListScreen({navigation}:any) {
  return (
    <SafeAreaView style={styles.container}>
      <Text>pantalla RoutineListScreen</Text>
      <Button
      title='Ver Rutina De Pecho'
      onPress={()=>navigation.navigate('ChestDetail')}
      />
    </SafeAreaView>
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