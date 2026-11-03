import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../utils/api';

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // solo true en la primera carga

    const fetchEvents = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/eventos`);
            if (!res.ok) throw new Error('No dio response OK');
            setEvents(await res.json());
        } catch (error) {
            console.error('Error cargando eventos:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchEvents(); }, [fetchEvents]);

    const addEvent = (nuevoEvento) => setEvents((prev) => [...prev, nuevoEvento]);

    return (
        <EventsContext.Provider value={{ events, loading, fetchEvents, addEvent }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => useContext(EventsContext);