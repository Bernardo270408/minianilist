import { View, Text } from 'react-native';
import { styles } from '../styles/styles';

export function MediaCount({ quantidade }) {
  return (
    <View style={styles.countContainer}>
      <Text style={styles.countText}>
        Você tem {quantidade} {quantidade === 1 ? 'anime' : 'animes'} cadastrado{quantidade === 1 ? '' : 's'}.
      </Text>
    </View>
  );
}
