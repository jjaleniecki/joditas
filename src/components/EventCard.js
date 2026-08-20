import React, { memo } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.35;

// Misma base que usás en Home.jsx
const API_BASE_URL = 'http://192.168.1.38:4001';

const EventCard = ({ item }) => {
    const navigation = useNavigation();
    const dateString = new Date(item.date).toLocaleDateString();
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

const styles = StyleSheet.create({
    card: { width: CARD_WIDTH, marginLeft: 15 },
    image: { width: '100%', height: CARD_WIDTH * 1.5, backgroundColor: '#333', borderRadius: 8, marginBottom: 5 },
    cardTitle: { color: '#fff', fontSize: 14, fontWeight: '600' },
    cardDate: { color: '#aaa', fontSize: 12 },
});

export default memo(EventCard);