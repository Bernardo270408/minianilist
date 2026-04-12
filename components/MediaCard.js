import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';


export function MediaCard({ item, isSaved, onAdd, onRemove }) {
  const imageUrl = item.poster 
    ? `https://image.tmdb.org/t/p/w500${item.poster}` 
    : 'https://via.placeholder.com/500x750?text=Sem+Foto';

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === 'N/A') return 'N/A';
    
    const [year, month, day] = dateStr.split('-');
    

    return `${day}/${month}/${year}`;
  };


  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.mediaTag}>
            {item.mediaType === 'tv' ? 'SÉRIE' : 'FILME'}
          </Text>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          
          <Text style={styles.synopsis}>{formatDate(item.release_date)}</Text>
          <View style={styles.row}>
            <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.classification}</Text>
            </View>

          </View>
        </View>
        
        <Text style={styles.synopsis} numberOfLines={2}>{item.overview}</Text>

        <View style={styles.buttonContainer}>
          {isSaved ? (
            <TouchableOpacity style={[styles.button, styles.btnRemove]} onPress={() => onRemove(item.id)}>
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.btnAdd]} onPress={() => onAdd(item)}>
              <Text style={styles.buttonText}>+ Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}