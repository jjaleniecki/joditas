import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import EventCard, { CARD_WIDTH } from './EventCard';
import { API_BASE_URL } from '../../utils/api';
import styles from './styles'; //estilos de su carpeta

const EventRow = ({ category }) => {
    const [events, setEvents] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const requestInProgress = useRef(false);
    const requestId = useRef(0);

    const fetchPage = useCallback(async (pageOffset, currentRequestId) => {
        if (requestInProgress.current) return;
        requestInProgress.current = true;
        setError(null);
        if (pageOffset === 0) setLoading(true);
        else setLoadingMore(true);

        try {
            const categoria = encodeURIComponent(category.title);
            const response = await fetch(
                `${API_BASE_URL}/eventos?cant=10&offset=${pageOffset}&category=${categoria}`
            );
            if (!response.ok) throw new Error('No se pudieron cargar los eventos');
            const page = await response.json();
            if (!Array.isArray(page)) throw new Error('La respuesta de eventos no es válida');
            if (requestId.current !== currentRequestId) return;

            setEvents(previous => pageOffset === 0 ? page : [...previous, ...page]);
            setOffset(pageOffset + page.length);
            setHasMore(page.length === 10);
        } catch (fetchError) {
            if (requestId.current === currentRequestId) {
                console.error('Error cargando eventos de la categoría:', fetchError);
                setError(fetchError.message);
            }
        } finally {
            if (requestId.current === currentRequestId) {
                requestInProgress.current = false;
                setLoading(false);
                setLoadingMore(false);
            }
        }
    }, [category.title]);

    useEffect(() => {
        const currentRequestId = requestId.current + 1;
        requestId.current = currentRequestId;
        requestInProgress.current = false;
        setEvents([]);
        setOffset(0);
        setHasMore(true);
        fetchPage(0, currentRequestId);
        return () => {
            requestId.current += 1;
            requestInProgress.current = false;
        };
    }, [category.title, fetchPage]);

    const loadMore = useCallback(() => {
        if (hasMore && !requestInProgress.current) {
            fetchPage(offset, requestId.current);
        }
    }, [fetchPage, hasMore, offset]);

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{category.title}</Text>
            <FlatList
                data={events}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <EventCard item={item} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.01}
                ListFooterComponent={
                    <View style={styles.footer}>
                        {loading || loadingMore ? <ActivityIndicator color="#ca780c" /> : null}
                        {error ? (
                            <Pressable onPress={loadMore}>
                                <Text style={styles.error}>Error al cargar. Reintentar</Text>
                            </Pressable>
                        ) : null}
                    </View>
                }
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


export default memo(EventRow);