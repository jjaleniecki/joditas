import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, Image, Pressable, ActivityIndicator } from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { normalizeCategory } from '../../utils/normalizeCategory';
import { API_BASE_URL } from '../../utils/api';

const Search= () => {
    const navigation = useNavigation();
    const [eventos, setEventos] = useState([]);   // todos los eventos que trae el backend
    const [loading, setLoading] = useState(true); // true mientras espera la respuesta
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/eventos`);
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                console.error('Error cargando eventos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

        const resultados = useMemo(() => {
        if (!busqueda.trim()) return eventos; //saca espacios, sino hay nad muestra todos

        const textoNormalizado = normalizeCategory(busqueda);

        return eventos.filter((evento) => {
            const titulo = normalizeCategory(evento.title || '');
            const lugar = normalizeCategory(evento.venue || '');
            const ciudad = normalizeCategory(evento.city || '');
            return ( //devuelve busqueda por titulo lugar o ciudad
                titulo.includes(textoNormalizado) ||
                lugar.includes(textoNormalizado) ||
                ciudad.includes(textoNormalizado)
            );
        });
    }, [busqueda, eventos]);
    const irAlDetalle = (evento) => {
        navigation.navigate('ParticularEvent', { evento });
    };

    const renderItem = ({ item }) => {
        const imageUrl = `${API_BASE_URL}/images/${item.img}`;
        const dateString = new Date(item.date).toLocaleDateString();

        return (
            <Pressable style={styles.resultado} onPress={() => irAlDetalle(item)}>
                <Image source={{ uri: imageUrl }} style={styles.thumbnail} resizeMode="cover" />
                <View style={styles.info}>
                    <Text style={styles.titulo} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.subtitulo} numberOfLines={1}>{item.venue}, {item.city}</Text>
                    <Text style={styles.fecha}>{dateString}</Text>
                </View>
            </Pressable>
        );
    };
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: '#111' }} edges={['bottom', 'left', 'right']}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                placement="center"
                centerComponent={{ text: '+joditas', style: { color: '#888', fontSize: 18, fontWeight: 'bold' } }}
                containerStyle={{ backgroundColor: '#111', borderBottomWidth: 0 }}
            />

            <TextInput
                style={styles.input}
                placeholder="Buscar evento, lugar o ciudad..."
                placeholderTextColor="#888"
                value={busqueda}
                onChangeText={setBusqueda}
                autoCapitalize="none"
            />

            {loading ? (
                <ActivityIndicator style={{ marginTop: 20 }} color="#ca780c" size="large" />
            ) : (
                <FlatList
                    data={resultados}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    ListEmptyComponent={
                        <Text style={styles.sinResultados}>No encontramos eventos con eso</Text>
                    }
                />
            )}
        </SafeAreaView>
    );
};
export default Search;
