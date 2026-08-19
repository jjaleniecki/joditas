import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import EventRow from '../../components/EventRow';

const { width } = Dimensions.get('window');

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            // Replace this mock data with your actual API call later
            const mockApiData = [
                {
                    id: 'cat1',
                    title: 'Cachengue',
                    events: [
                        { id: 'e1', title: 'Fiesta 1', date: '2026-10-15' },
                        { id: 'e2', title: 'Fiesta 2', date: '2026-08-25' },
                    ],
                },
                {
                    id: 'cat2',
                    title: 'Tecno',
                    events: [
                        { id: 'e4', title: 'Festival 1', date: '2026-09-01' },
                        { id: 'e5', title: 'Festival 2', date: '2026-09-02' },
                    ],
                },
            ];

            setData(mockApiData);
            setLoading(false);
        };

        fetchEvents();
    }, []);

    const renderHeader = () => (
        <Image
            source={require('../../assets/images/ppal.jpg')}
            style={{ width: width, height: 400, marginBottom: 20 }}
            resizeMode="cover"
        />
    );

    return (
        // Assuming a dark theme based on the typical Netflix style
        <SafeAreaProvider style={{ flex: 1, paddingTop: 0, backgroundColor: '#000' }}>
            <Header
                statusBarProps={{ barStyle: 'dark-content' }}
                placement="center"
                // leftComponent={{icon: 'menu', color: '#000'}}
                centerComponent={{ text: '+joditas', style: { color: '#000', fontSize: 18, fontWeight: 'bold' } }}
                // rightComponent={{icon: 'search', color: '#000'}}
                containerStyle={{
                    backgroundColor: '#ca780c',
                    borderBottomWidth: 0, // Removes the default 1px border line from RNEUI
                }}
            />

            {loading ? (
                <ActivityIndicator style={styles.loader} color="#ca780c" size="large" />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <EventRow category={item} />}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={{ paddingBottom: 50 }}

                    // Performance props
                    initialNumToRender={3}
                    windowSize={5}
                    removeClippedSubviews={true}
                />
            )}
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000'
    }
});

export default Home;