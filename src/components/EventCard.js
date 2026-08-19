import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export const CARD_WIDTH = width * 0.35;

const EventCard = ({ item }) => {
    const dateString = new Date(item.date).toLocaleDateString();

    return (
        <View style={styles.card}>
            <View style={styles.imagePlaceholder} />
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardDate}>{dateString}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: { width: CARD_WIDTH, marginLeft: 15 },
    imagePlaceholder: { width: '100%', height: CARD_WIDTH * 1.5, backgroundColor: '#333', borderRadius: 8, marginBottom: 5 },
    cardTitle: { color: '#fff', fontSize: 14, fontWeight: '600' },
    cardDate: { color: '#aaa', fontSize: 12 },
});

// Exporting with React.memo to prevent unnecessary re-renders
export default memo(EventCard);