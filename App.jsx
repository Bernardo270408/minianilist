import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen'; 
import { styles } from './styles/styles';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" /> 
      
      <HomeScreen />
    </View>
  );
}