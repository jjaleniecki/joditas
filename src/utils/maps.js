import { Alert, Linking } from 'react-native';

// Solo aceptamos links que realmente sean de Google Maps:
// google.com/maps, maps.google.com, maps.app.goo.gl y goo.gl/maps
const LINK_MAPS_VALIDO =
    /^https?:\/\/((www\.)?google\.[a-z.]+\/maps|maps\.google\.[a-z.]+|maps\.app\.goo\.gl|goo\.gl\/maps)/i;

// Devuelve un link de Maps que se pueda abrir, o null si no hay forma
// (vacío, texto basura, placeholder, embed sin datos usables, etc.)
export const getMapsLink = (mapUrl, city = '') => {
    if (!mapUrl || typeof mapUrl !== 'string') return null;

    const url = mapUrl.trim();
    if (!LINK_MAPS_VALIDO.test(url)) return null;

    // Link normal (ej. copiado con "Compartir"): se usa tal cual
    if (!url.includes('/maps/embed')) return url;

    // Link de embed: solo sirve dentro de un iframe, así que lo convertimos.
    // El nombre del lugar viaja dentro del embed, ya codificado para URL
    const nombre = url.match(/!2s([^!]+)/);
    if (nombre) {
        const consulta = city ? `${nombre[1]}%20${encodeURIComponent(city)}` : nombre[1];
        return `https://www.google.com/maps/search/?api=1&query=${consulta}`;
    }

    // Plan B: las coordenadas
    const lat = url.match(/!3d(-?\d+\.\d+)/);
    const lng = url.match(/!2d(-?\d+\.\d+)/);
    if (lat && lng) {
        return `https://www.google.com/maps/search/?api=1&query=${lat[1]},${lng[1]}`;
    }

    return null;
};

// Abre el mapa, o avisa con un alert si el link no está disponible
export const abrirMapa = async (mapUrl, city) => {
    const link = getMapsLink(mapUrl, city);

    if (!link) {
        Alert.alert('Ubicación no disponible', 'Este evento no tiene un link de mapa válido.');
        return;
    }

    try {
        await Linking.openURL(link);
    } catch (error) {
        Alert.alert('No se pudo abrir el mapa', 'Probá de nuevo más tarde.');
    }
};