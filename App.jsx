import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen'; 

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" /> 
      
      <HomeScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Ou a cor de fundo que você definiu no seu styles.js
  },
});