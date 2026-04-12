import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import { styles } from './styles/styles';
import { searchAnimations } from '../services/tmdb';
import { useSavedList } from '../hooks/useSavedList';
import { MediaCard } from '../components/MediaCard';

export default function HomeScreen() {
  const { savedList, handleAdd, handleRemove, isItemSaved } = useSavedList();
  
  const [searchResults, setSearchResults] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isViewingSearch, setIsViewingSearch] = useState(false);

  const performSearch = async () => {
    const query = searchQuery.trim(); 
    if (!query) return handleBack();

    setIsViewingSearch(true); 
    setLoading(true);
    Keyboard.dismiss(); 
    
    try {
      const results = await searchAnimations(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Erro na busca:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setIsViewingSearch(false);
    setSearchResults([]);
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const dataToDisplay = isViewingSearch ? searchResults : savedList;
  const emptyMessage = isViewingSearch 
    ? "Nenhum resultado encontrado." 
    : "Sua lista está vazia. Adicione itens primeiro!";

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { flexDirection: 'row', alignItems: 'center' }]}>
        {isViewingSearch && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.searchInput, { flex: 1, marginLeft: isViewingSearch ? 10 : 0 }]}
          placeholder="Busque filmes, séries..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery} 
          onSubmitEditing={performSearch} 
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E50914" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={dataToDisplay}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ color: '#888', fontSize: 16 }}>{emptyMessage}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <MediaCard 
              item={item} 
              isSaved={isItemSaved(item.id)}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          )}
        />
      )}
    </View>
  );
}