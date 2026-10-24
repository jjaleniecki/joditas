import { useEffect, useState, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as RNCalendar } from 'react-native-calendars';
import styles from './styles'; //estilos de su carpeta
import { API_BASE_URL } from '../../utils/api';
import EventCard from '../../components/EventCard';

const Calendar = () => {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/eventos`);
                if (!response.ok) throw new Error('No dio response OK');
                const jsonData = await response.json();
                setEventos(jsonData);
            } catch (error) {
                console.error('Error cargando eventos:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEventos();
    }, []);

    // Arma { "2026-12-09": { marked: true, dotColor: '#ca780c' }, ... }
    const markedDates = useMemo(() => {
        const marcas = {};
        eventos.forEach((evento) => {
            if (!evento.date) return;
            marcas[evento.date] = { marked: true, dotColor: '#ca780c' };
        });
        if (selectedDate) {
            marcas[selectedDate] = {
                ...(marcas[selectedDate] || {}),
                selected: true,
                selectedColor: '#ca780c',
            };
        }
        return marcas;
    }, [eventos, selectedDate]);

    // Eventos del día seleccionado
    const eventosDelDia = useMemo(() => {
        if (!selectedDate) return [];
        return eventos.filter((evento) => evento.date === selectedDate);
    }, [eventos, selectedDate]);

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: '#111' }} edges={['bottom', 'left', 'right']}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                placement="center"
                centerComponent={{ text: '+joditas', style: { color: '#888', fontSize: 18, fontWeight: 'bold' } }}
                containerStyle={{
                    backgroundColor: '#111',
                    borderBottomWidth: 0,
                }}
            />

            {loading ? (
                <ActivityIndicator style={{ marginTop: 40 }} color="#ca780c" size="large" />
            ) : (
                <>
                    <RNCalendar
                        onDayPress={(day) => setSelectedDate(day.dateString)}
                        markedDates={markedDates}
                        theme={{
                            backgroundColor: '#111',
                            calendarBackground: '#111',
                            dayTextColor: '#fff',
                            monthTextColor: '#fff',
                            textDisabledColor: '#444',
                            arrowColor: '#ca780c',
                            todayTextColor: '#ca780c',
                            selectedDayBackgroundColor: '#ca780c',
                            dotColor: '#ca780c',
                        }}
                    />

                    {selectedDate && (
                        <View style={{ flex: 1, marginTop: 15 }}>
                            {eventosDelDia.length === 0 ? (
                                <Text style={{ color: '#888', textAlign: 'center', marginTop: 20 }}>
                                    No hay eventos para este día
                                </Text>
                            ) : (
                                <FlatList
                                    data={eventosDelDia}
                                    horizontal
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => <EventCard item={item} />}
                                    contentContainerStyle={{ paddingLeft: 15, paddingBottom: 20 }}
                                />
                            )}
                        </View>
                    )}
                </>
            )}
        </SafeAreaView>
    );
};

export default Calendar;
