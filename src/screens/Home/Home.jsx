import React, { useState, useMemo } from 'react';
import { FlatList, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'; //estilos de su carpeta
import { useEvents } from '../../context/EventsContext';

import EventRow from '../../components/EventRow';

const { width } = Dimensions.get('window');

// Agrupa un array plano de eventos en [{ title, events }, ...] por categoría
const groupEventsByCategory = (events) => {
    const groups = {};

    events.forEach((event) => {
        const categoryKey = event.category || 'Otros';

        if (!groups[categoryKey]) {
            groups[categoryKey] = [];
        }
        groups[categoryKey].push(event);
    });

    return Object.keys(groups).map((categoryKey) => ({
        title: categoryKey,
        events: groups[categoryKey],
    }));
};

const Home = () => {
    const { events, loading, fetchEvents } = useEvents();
    const [refreshing, setRefreshing] = useState(false);

    // Se recalcula solo cuando "events" cambia, no en cada render
    const groupedData = useMemo(() => groupEventsByCategory(events), [events]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEvents();
        setRefreshing(false);
    };

    const renderHeader = () => (
        <Image
            source={require('../../assets/images/ppal.jpg')}
            style={{ width: width, height: 260, marginBottom: 20 }}
            resizeMode="cover"
        />
    );

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: '#111' }} edges={['bottom', 'left', 'right']}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                placement="center"
                // leftComponent={{icon: 'menu', color: '#000'}}
                centerComponent={{ text: '+joditas', style: { color: '#888', fontSize: 18, fontWeight: 'bold' } }}
                // rightComponent={{icon: 'search', color: '#000'}}
                containerStyle={{
                    backgroundColor: '#111',
                    borderBottomWidth: 0,
                }}
            />

            {loading ? (
                <ActivityIndicator style={styles.loader} color="#ca780c" size="large" />
            ) : (
                <FlatList
                    data={groupedData}
                    keyExtractor={(group) => group.title}
                    renderItem={({ item }) => <EventRow category={item} />}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={{ paddingBottom: 50 }}

                    // Pull-to-refresh (opcional: si no lo querés, borrá estas dos props y onRefresh)
                    refreshing={refreshing}
                    onRefresh={onRefresh}

                    // Performance props
                    initialNumToRender={3}
                    windowSize={5}
                    removeClippedSubviews={true}
                />
            )}
        </SafeAreaView>
    );
};

export default Home;