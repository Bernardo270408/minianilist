import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import { MediaCard } from './MediaCard';

export function ListItem({ item, isSaved, onAdd, onRemove }) {
  const handlePress = isSaved ? onRemove.bind(this, item.id) : onAdd.bind(this, item);

  return (
    <Pressable
      android_ripple={{ color: '#e0e0e0' }}
      style={({ pressed }) => [styles.listItem, pressed && styles.listItemPressed]}
      onPress={handlePress}
    >
      <View style={styles.listItemTop}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
      </View>
      <MediaCard
        item={item}
        isSaved={isSaved}
        onAdd={onAdd}
        onRemove={onRemove}
        hideTitle
      />
    </Pressable>
  );
}

export default ListItem;
