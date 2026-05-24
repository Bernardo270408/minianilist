import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

export function ClearButton({ onClear }) {
  return (
    <TouchableOpacity style={[styles.button, styles.btnClear]} onPress={onClear}>
      <Text style={styles.buttonText}>Limpar Tudo</Text>
    </TouchableOpacity>
  );
}
