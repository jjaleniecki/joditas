import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        color: '#888',
        fontSize: 13,
        marginBottom: 8,
    },
    chipsRow: {
        gap: 8,
        paddingRight: 8,
    },
    chip: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
    },
    chipSelected: {
        backgroundColor: '#ca780c',
    },
    chipText: {
        color: '#fff',
        fontSize: 14,
    },
    chipTextSelected: {
        fontWeight: '600',
    },
    chipNueva: {
        borderWidth: 1,
        borderColor: '#ca780c',
        backgroundColor: 'transparent',
    },
    chipNuevaText: {
        color: '#ca780c',
        fontSize: 14,
        fontWeight: '600',
    },
    nuevaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 8,
    },
    nuevaInput: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
    },
    confirmarButton: {
        backgroundColor: '#ca780c',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    confirmarText: {
        color: '#fff',
        fontWeight: '600',
    },
    seleccionActual: {
        color: '#888',
        fontSize: 12,
        marginTop: 8,
    },
});

export default styles;