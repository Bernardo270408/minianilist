import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.base, 
    paddingTop: 30 
  },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', // Movido do estilo inline
    paddingHorizontal: 15, 
    marginBottom: 10 
  },
  searchInput: { 
    flex: 1, 
    backgroundColor: COLORS.surface0, 
    color: COLORS.text, 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    height: 45 
  },
  searchInputWithMargin: {
    marginLeft: 10 // Adicionado para substituir o inline dinâmico
  },
  searchButton: { 
    backgroundColor: COLORS.mauve, 
    marginLeft: 10, 
    borderRadius: 8, 
    width: 45, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  searchButtonText: { 
    fontSize: 18 
  },
  list: { 
    padding: 15 
  },
  card: { 
    backgroundColor: COLORS.mantle, 
    borderRadius: 12, 
    flexDirection: 'row', 
    marginBottom: 20, 
    overflow: 'hidden', 
    height: 180,
    borderWidth: 1,
    borderColor: COLORS.surface0
  },
  image: { 
    width: 110, 
    height: '100%' 
  },
  infoContainer: { 
    flex: 1, 
    padding: 12, 
    justifyContent: 'space-between' 
  },
  mediaTag: { 
    color: COLORS.mauve, 
    fontSize: 10, 
    fontWeight: 'bold', 
    marginBottom: 2 
  },
  title: { 
    color: COLORS.text, 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 4 
  },
  rating: { 
    color: COLORS.yellow, 
    fontWeight: 'bold', 
    marginRight: 10, 
    fontSize: 13 
  },
  badge: { 
    backgroundColor: COLORS.surface0, 
    paddingHorizontal: 6, 
    paddingVertical: 2,
    borderRadius: 4 
  },
  badgeText: { 
    color: COLORS.text, 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  genres: { 
    color: COLORS.subtext, 
    fontSize: 12 
  },
  synopsis: { 
    color: COLORS.subtext, 
    fontSize: 12, 
    lineHeight: 16 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    gap: 8,
    marginTop: 4
  },
  button: { 
    flex: 1, 
    paddingVertical: 8, 
    borderRadius: 6, 
    alignItems: 'center' 
  },
  btnAdd: { 
    backgroundColor: COLORS.green 
  },
  btnRemove: { 
    backgroundColor: COLORS.red 
  },
  buttonText: { 
    color: COLORS.crust, 
    fontSize: 11, 
    fontWeight: 'bold' 
  },
  backButton: {
    padding: 14,
    backgroundColor: COLORS.surface0, 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadingIndicator: {
    marginTop: 50
  },
  emptyContainer: {
    alignItems: 'center', 
    marginTop: 50
  },
  emptyText: {
    color: COLORS.subtext,
    fontSize: 16
  },
  // Adicione isso no seu styles.js
  filtersWrapper: {
    height: 50,
    marginBottom: 10,
  },
  filtersContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    gap: 8
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.surface0,
    marginRight: 8, 
  },
  filterButtonActive: {
    backgroundColor: COLORS.mauve, 
  },
  filterText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.background,
  },
  // Estilos para Header Component
  header: {
    backgroundColor: COLORS.mauve,
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.surface0,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Estilos para MediaCount Component
  countContainer: {
    backgroundColor: COLORS.surface0,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
  },
  countText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
  // Estilos para ClearButton Component
  btnClear: {
    backgroundColor: COLORS.red,
    marginHorizontal: 15,
    marginBottom: 20,
    paddingVertical: 12,
  },
});