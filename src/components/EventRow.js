import React, { memo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EventCard, { CARD_WIDTH } from './EventCard';

const EventRow = ({ category }) => {
    // Sort events: Nearest date first (left), furthest last (right)
    const sortedEvents = [...category.events].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{category.title}</Text>
            <FlatList
                data={sortedEvents}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <EventCard item={item} />}
                snapToInterval={CARD_WIDTH + 15}
                snapToAlignment="start"
                decelerationRate="fast"
                initialNumToRender={4}
                maxToRenderPerBatch={4}
                windowSize={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: { marginBottom: 25 },
    rowTitle: { color: '#888', fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 },
});

export default memo(EventRow);