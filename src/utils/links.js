import { Alert, Linking } from 'react-native';

// http(s):// + dominio con al menos un punto (ej. https://instagram.com/foo)
const LINK_VALIDO = /^https?:\/\/([^\s/$.?#]+\.)+[^\s/$.?#]{2,}([/?#]\S*)?$/i;

// Lo mismo pero sin el https:// (ej. "instagram.com/foo")
const SIN_PROTOCOLO = /^([^\s/$.?#]+\.)+[^\s/$.?#]{2,}([/?#]\S*)?$/i;

// Devuelve un link abrible, o null si el texto no tiene forma de link
// (vacío, "N/A", "-", un placeholder, texto suelto, etc.)
export const getContactLink = (contact) => {
    if (!contact || typeof contact !== 'string') return null;

    const texto = contact.trim();

    if (LINK_VALIDO.test(texto)) return texto;

    // Si alguien cargó "instagram.com/foo" sin el https://, se lo agregamos
    if (SIN_PROTOCOLO.test(texto)) return `https://${texto}`;

    return null;
};

// Abre el contacto, o avisa con un alert si el link no está disponible
export const abrirContacto = async (contact) => {
    const link = getContactLink(contact);

    if (!link) {
        Alert.alert('Contacto no disponible', 'Este evento no tiene un link de contacto válido.');
        return;
    }

    try {
        await Linking.openURL(link);
    } catch (error) {
        Alert.alert('No se pudo abrir el contacto', 'Probá de nuevo más tarde.');
    }
};