// styles.js
import { StyleSheet } from 'react-native';
import { COLORS } from './theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.base, 
    paddingTop: 50 
  },
  searchContainer: { 
    flexDirection: 'row', 
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
    // Sombra leve para destacar no fundo 'base'
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
    color: COLORS.crust, // Texto escuro nos botões coloridos para melhor contraste
    fontSize: 11, 
    fontWeight: 'bold' 
  },
  backButton: {
    padding: 14,
    backgroundColor: COLORS.surface0, // Ou a cor que combinar com seu app
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
});