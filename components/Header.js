import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export function Header({ titulo, corFundo }) {
  return (
    <View style={[
      styles.header,
      corFundo && { backgroundColor: corFundo }
    ]}>
      <Text style={styles.headerTitle}>{titulo}</Text>
    </View>
  );
}
