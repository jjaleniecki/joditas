import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';
import styles from './styles'; //estilos de su carpeta

// categorias: array de strings ya existentes (sacadas de los eventos actuales)
// value: categoría seleccionada actualmente
// onChange: (categoria) => void
const CategoryPicker = ({ categorias, value, onChange }) => {
    const [agregandoNueva, setAgregandoNueva] = useState(false);
    const [nuevaCategoria, setNuevaCategoria] = useState('');

    const seleccionarExistente = (cat) => {
        setAgregandoNueva(false);
        onChange(cat);
    };

    const confirmarNueva = () => {
        const categoria = nuevaCategoria.trim();
        if (categoria) {
            onChange(categoria);
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

export default CategoryPicker;