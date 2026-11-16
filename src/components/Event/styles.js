import { StyleSheet, Dimensions} from 'react-native';


const { width } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.35;

const styles = StyleSheet.create({
    // Estilos de EventRow
    rowContainer: { marginBottom: 25 },
    rowTitle: { color: '#888', fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 },
    footer: { width: 100, justifyContent: 'center', alignItems: 'center' },
    error: { color: '#ca780c', fontSize: 12, textAlign: 'center' },

    // Estilos de EventCard
    card: { width: CARD_WIDTH, marginLeft: 15 },
    image: { width: '100%', height: CARD_WIDTH * 1.5, backgroundColor: '#333', borderRadius: 8, marginBottom: 5 },
    cardTitle: { color: '#fff', fontSize: 14, fontWeight: '600' },
    cardDate: { color: '#aaa', fontSize: 12 },
});

export default styles;