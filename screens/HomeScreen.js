import { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Keyboard, ScrollView } from 'react-native';
import { styles } from '../styles/styles';
import { COLORS } from '../styles/theme'
import { searchAnimations } from '../services/tmdb';
import { useSavedList } from '../hooks/useSavedList';
import { MediaCard } from '../components/MediaCard';
import { MediaCount } from '../components/MediaCount';
import { ClearButton } from '../components/ClearButton';

export default function HomeScreen() {
  const { savedList, handleAdd, handleRemove, isItemSaved } = useSavedList();
  
  const [searchResults, setSearchResults] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isViewingSearch, setIsViewingSearch] = useState(false);
  
  const [sortOption, setSortOption] = useState('');

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
    setSortOption(''); 
    Keyboard.dismiss();
  };

  const clearAllHandler = async () => {
    // Remove all items from the saved list
    const newList = [];
    await handleRemove(null); // This will be overridden by the actual clear logic below
    // Actually, we need to clear savedList - let's use AsyncStorage directly
    // But we should use the hook's capability. Let's call handleRemove for each item
    // Better approach: we'll iterate and remove
    for (const item of savedList) {
      await handleRemove(item.id);
    }
  };

  const baseData = isViewingSearch ? searchResults : savedList;

  const dataToDisplay = useMemo(() => {
    let data = [...baseData];

    switch (sortOption) {
      case 'AZ':
        return data.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      case 'ZA':
        return data.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
      case 'RATE_ASC':
        return data.sort((a, b) => (a.rating || 0) - (b.rating || 0));
      case 'RATE_DESC':
        return data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'DATE_ASC':
        return data.sort((a, b) => new Date(a.release_date || 0) - new Date(b.release_date || 0));
      case 'DATE_DESC':
        return data.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
      default:
        return data;
    }
  }, [baseData, sortOption]);

  const emptyMessage = isViewingSearch 
    ? "Nenhum resultado encontrado." 
    : "Sua lista está vazia. Adicione alguns animes!";

  // Opções de filtro para renderizar no UI
  const filterOptions = [
    { id: 'AZ', label: 'A-Z' },
    { id: 'ZA', label: 'Z-A' },
    { id: 'RATE_ASC', label: 'Rate ↑' },
    { id: 'RATE_DESC', label: 'Rate ↓' },
    { id: 'DATE_ASC', label: 'Oldest' },
    { id: 'DATE_DESC', label: 'Newest' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {isViewingSearch && (
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        )}
        <TextInput
          style={[styles.searchInput, isViewingSearch && styles.searchInputWithMargin]}
          placeholder="Busque por Animes"
          placeholderTextColor={COLORS.subtext}
          value={searchQuery}
          onChangeText={setSearchQuery} 
          onSubmitEditing={performSearch} 
        />
      </View>

      {/* Menu horizontal de Filtros */}
      <View style={styles.filtersWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContainer}>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.filterButton,
                sortOption === option.id && styles.filterButtonActive
              ]}
              onPress={() => setSortOption(sortOption === option.id ? '' : option.id)} // Clicar no filtro ativo desmarca ele
            >
              <Text style={[
                styles.filterText,
                sortOption === option.id && styles.filterTextActive
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Contador de animes salvos (apenas quando não está em busca) */}
      {!isViewingSearch && <MediaCount quantidade={savedList.length} />}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.red} style={styles.loadingIndicator} />
      ) : (
        <FlatList
          data={dataToDisplay}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{emptyMessage}</Text>
            </View>
          )}
          ListFooterComponent={
            !isViewingSearch && savedList.length > 0 ? (
              <ClearButton onClear={clearAllHandler} />
            ) : null
          }
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