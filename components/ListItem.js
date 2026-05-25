import { Pressable, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import { MediaCard } from './MediaCard';

export function ListItem({ item, isSaved, onAdd, onRemoveRequest }) {
  return (
    <View style={styles.listItem}>
      <View style={styles.listItemTop}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
      </View>
      <MediaCard
        item={item}
        isSaved={isSaved}
        onAdd={onAdd}
        onRemove={onRemoveRequest}
        hideTitle
      />
    </View>
  );
}

export default ListItem;
