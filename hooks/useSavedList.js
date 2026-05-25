import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@minha_lista';

export function useSavedList() {
  const [savedList, setSavedList] = useState([]);

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

  const handleClear = async () => {
    try {
      const newList = [];
      setSavedList(newList);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    } catch (e) {
      console.error('Erro ao limpar lista:', e);
    }
  };

  // Retorna um helper para verificar se um item já está salvo
  const isItemSaved = (id) => savedList.some(item => item.id === id);

  return { savedList, handleAdd, handleRemove, handleClear, isItemSaved };
}