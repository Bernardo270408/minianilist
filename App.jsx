import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { Header } from './components/Header';
import HomeScreen from './screens/HomeScreen'; 
import { styles } from './styles/styles';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" /> 
      
      <Header titulo="MiniAniList" corFundo="#9B59B6" />
      <HomeScreen />
    </View>
  );
}