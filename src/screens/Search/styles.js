import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
    },
    resultado: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        gap: 12,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    info: {
        flex: 1,
    },
    titulo: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    subtitulo: {
        color: '#aaa',
        fontSize: 13,
        marginTop: 2,
    },
    fecha: {
        color: '#888',
        fontSize: 12,
        marginTop: 2,
    },
    sinResultados: {
        color: '#888',
        textAlign: 'center',
        marginTop: 40,
    },
});

export default styles;