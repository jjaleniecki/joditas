import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import { normalizeCategory } from '../utils/normalizeCategory';

// categorias: array de strings ya existentes (sacadas de los eventos actuales)
// value: categoría seleccionada actualmente (string normalizado)
// onChange: (categoriaNormalizada) => void
const CategoryPicker = ({ categorias, value, onChange }) => {
    const [agregandoNueva, setAgregandoNueva] = useState(false);
    const [nuevaCategoria, setNuevaCategoria] = useState('');

    const seleccionarExistente = (cat) => {
        setAgregandoNueva(false);
        onChange(cat);
    };

    const confirmarNueva = () => {
        const normalizada = normalizeCategory(nuevaCategoria);
        if (normalizada) {
            onChange(normalizada);
        }
        setNuevaCategoria('');
        setAgregandoNueva(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Categoría</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
                {categorias.map((cat) => (
                    <Pressable
                        key={cat}
                        style={[styles.chip, value === cat && styles.chipSelected]}
                        onPress={() => seleccionarExistente(cat)}
                    >
                        <Text style={[styles.chipText, value === cat && styles.chipTextSelected]}>
                            {cat}
                        </Text>
                    </Pressable>
                ))}

                <Pressable
                    style={[styles.chip, styles.chipNueva]}
                    onPress={() => setAgregandoNueva(true)}
                >
                    <Text style={styles.chipNuevaText}>+ Nueva</Text>
                </Pressable>
            </ScrollView>

            {agregandoNueva && (
                <View style={styles.nuevaRow}>
                    <TextInput
                        style={styles.nuevaInput}
                        placeholder="Nombre de la categoría"
                        placeholderTextColor="#888"
                        value={nuevaCategoria}
                        onChangeText={setNuevaCategoria}
                        autoCapitalize="none"
                        autoFocus
                    />
                    <Pressable style={styles.confirmarButton} onPress={confirmarNueva}>
                        <Text style={styles.confirmarText}>OK</Text>
                    </Pressable>
                </View>
            )}

            {/* Muestra qué quedó seleccionado, útil sobre todo tras agregar una nueva */}
            {value ? <Text style={styles.seleccionActual}>Seleccionada: {value}</Text> : null}
        </View>
    );
};

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

export default CategoryPicker;