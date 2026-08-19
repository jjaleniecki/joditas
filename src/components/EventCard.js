import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.35;

// Misma base que usás en Home.jsx para el fetch de eventos
const API_BASE_URL = 'http://192.168.1.38:4001';

const EventCard = ({ item }) => {
    const dateString = new Date(item.date).toLocaleDateString();
    const imageUrl = `${API_BASE_URL}/images/${item.img}`;

    return (
        <View style={styles.card}>
            <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardDate}>{dateString}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { width: CARD_WIDTH, marginLeft: 15 },
    image: { width: '100%', height: CARD_WIDTH * 1.5, backgroundColor: '#333', borderRadius: 8, marginBottom: 5 },
    cardTitle: { color: '#999', fontSize: 14, fontWeight: '600' },
    cardDate: { color: '#999', fontSize: 12 },
});

// Exporting with React.memo to prevent unnecessary re-renders
export default memo(EventCard);