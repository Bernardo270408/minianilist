import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles/styles';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY; 
const STORAGE_KEY = '@minha_lista';

export default function HomeScreen() {
  const [searchResults, setSearchResults] = useState([]); 
  const [savedList, setSavedList] = useState([]);       
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isViewingSearch, setIsViewingSearch] = useState(false);

  useEffect(() => {
    loadSavedItems();
  }, []);

  const loadSavedItems = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setSavedList(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error("Erro ao carregar lista:", e);
    }
  };

  const handleAdd = async (item) => {
    try {
      const newList = [...savedList, item];
      setSavedList(newList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error("Erro ao salvar:", e);
    }
  };

  const handleRemove = async (id) => {
    try {
      const newList = savedList.filter(item => item.id !== id);
      setSavedList(newList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error("Erro ao remover:", e);
    }
  };

  async function getContentDetails(id, mediaType) {
    const type = mediaType === 'tv' ? 'tv' : 'movie';
    const append = type === 'movie' ? 'release_dates' : 'content_ratings';
    
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&append_to_response=${append}&language=pt-BR`
    );
    const json = await res.json();

    let classification = 'N/A';
    if (type === 'movie') {
      const release = json.release_dates?.results.find(r => r.iso_3166_1 === 'BR') || json.release_dates?.results[0];
      classification = release?.release_dates[0]?.certification || 'N/A';
    } else {
      const rating = json.content_ratings?.results.find(r => r.iso_3166_1 === 'BR') || json.content_ratings?.results[0];
      classification = rating?.rating || 'N/A';
    }

    return {
      id: json.id,
      title: json.title || json.name,
      poster: json.poster_path,
      overview: json.overview || 'Sem descrição disponível.',
      rating: json.vote_average || 0,
      genres: json.genres?.map(g => g.name).slice(0, 2).join(', ') || 'N/A',
      classification: classification,
      mediaType: type
    };
  }

  const performSearch = async () => {
    const query = searchQuery.trim(); 
    
    if (query.length === 0) {
      handleBack();
      return;
    }

    setIsViewingSearch(true); 
    setLoading(true);
    Keyboard.dismiss(); 
    
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=pt-BR`
      );
      const json = await res.json();

      const animeResults = json.results.filter(item => 
        item.media_type !== 'person'
      ).slice(0, 10);
      
      const detailedData = await Promise.all(
        animeResults.map(item => getContentDetails(item.id, item.media_type))
      );

      const finalFilter = detailedData.filter(item => 
        item.genres.toLowerCase().includes('animação') || 
        item.genres.toLowerCase().includes('animation')
      );

      setSearchResults(finalFilter);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // NOVO: Função dedicada para o botão Voltar
  const handleBack = () => {
    setIsViewingSearch(false);
    setSearchResults([]);
    setSearchQuery(''); // Limpa o texto da busca
    Keyboard.dismiss();
  };

  const dataToDisplay = isViewingSearch ? searchResults : savedList;

  return (
    <View style={styles.container}>
      {/* NOVO: Container da busca atualizado para comportar o botão Voltar */}
      <View style={[styles.searchContainer, { flexDirection: 'row', alignItems: 'center' }]}>
        {isViewingSearch && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.searchInput, { flex: 1, marginLeft: isViewingSearch ? 10 : 0 }]} // Flex para ocupar o resto do espaço
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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ color: '#888', fontSize: 16 }}>
                {isViewingSearch 
                  ? "Nenhum resultado encontrado." 
                  : "Sua lista está vazia. Adicione itens primeiro!"}
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            const isSaved = savedList.some(s => s.id === item.id);

            return (
              <View style={styles.card}>
                <Image
                  source={{ uri: item.poster ? `https://image.tmdb.org/t/p/w500${item.poster}` : 'https://via.placeholder.com/500x750?text=Sem+Foto' }}
                  style={styles.image}
                />
                
                <View style={styles.infoContainer}>
                  <View>
                    <Text style={styles.mediaTag}>{item.mediaType === 'tv' ? 'SÉRIE' : 'FILME'}</Text>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    
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
                      <TouchableOpacity 
                        style={[styles.button, styles.btnRemove]} 
                        onPress={() => handleRemove(item.id)}
                      >
                        <Text style={styles.buttonText}>Remover</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity 
                        style={[styles.button, styles.btnAdd]} 
                        onPress={() => handleAdd(item)}
                      >
                        <Text style={styles.buttonText}>+ Add</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}