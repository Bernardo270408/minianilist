import { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/styles';

export function ItemInput({ onSubmit, placeholder = 'Busque por Animes', resetTrigger }) {
  const [text, setText] = useState('');

  useEffect(() => {
    // limpar input quando o pai sinalizar (ex: ao fechar busca)
    setText('');
  }, [resetTrigger]);

  const handleSend = () => {
    const q = text.trim();
    if (!q) return;
    onSubmit(q);
    setText('');
  };

  return (
    <View style={styles.searchInnerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
        returnKeyType="search"
        onSubmitEditing={handleSend}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSend}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default ItemInput;
