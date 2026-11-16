import React, { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatEventDate } from '../../utils/formatEventDate';
import styles from './styles'; //estilos de su carpeta

const { width } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.35;

// Misma base que usás en Home.jsx
import { API_BASE_URL } from '../../utils/api';

const EventCard = ({ item }) => {
    const navigation = useNavigation();
    const dateString = formatEventDate(item.date);
    const imageUrl = `${API_BASE_URL}/images/${item.img}`;

    const irAlDetalle = () => {
        navigation.navigate('ParticularEvent', { evento: item });
    };

    return (
        <Pressable style={styles.card} onPress={irAlDetalle}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardDate}>{dateString}</Text>
        </Pressable>
    );
};

export default memo(EventCard);