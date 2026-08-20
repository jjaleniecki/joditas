import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Image,
    ScrollView,
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import CategoryPicker from '../../components/CategoryPicker';

const API_BASE_URL = 'http://192.168.1.38:4001';

const CAMPOS_INICIALES = {
    title: '',
    venue: '',
    openTime: '',
    closeTime: '',
    contact: '',
    mapUrl: '',
    city: '',
    category: '',
    date: '',
};

const CreateEventForm = () => {
    const [form, setForm] = useState(CAMPOS_INICIALES);
    const [imagenUri, setImagenUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [categoriasExistentes, setCategoriasExistentes] = useState([]); // de los chips de categorias

    const { token, logout } = useAuth();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/eventos`);
                const eventos = await res.json();
                const unicas = [...new Set(eventos.map(e => e.category).filter(Boolean))];
                setCategoriasExistentes(unicas);
            } catch (error) {
                console.error('Error cargando categorías:', error);
            }
        };
        fetchCategorias();
    }, []);

    const actualizarCampo = (campo, valor) => {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    };

    const seleccionarImagen = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para subir el flyer');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: true,
            aspect: [3, 4],
        });

        if (!result.canceled) {
            setImagenUri(result.assets[0].uri);
        }
    };

    const validarFormulario = () => {
        const faltantes = Object.entries(form).filter(([_, valor]) => !valor.trim());

        if (faltantes.length > 0) {
            Alert.alert('Faltan datos', 'Completá todos los campos');
            return false;
        }

        if (!imagenUri) {
            Alert.alert('Falta la imagen', 'Subí el flyer del evento');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validarFormulario()) return;

        setLoading(true);

        try {
            const formData = new FormData();

            Object.entries(form).forEach(([clave, valor]) => {
                formData.append(clave, valor);
            });

            // Armamos el nombre y tipo del archivo a partir de la uri local
            const nombreArchivo = imagenUri.split('/').pop();
            const extension = nombreArchivo.split('.').pop();

            formData.append('img', {
                uri: imagenUri,
                name: nombreArchivo,
                type: `image/${extension === 'jpg' ? 'jpeg' : extension}`,
            });

            const response = await fetch(`${API_BASE_URL}/eventos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // No seteamos Content-Type a mano: fetch arma el boundary de multipart solo
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al crear el evento');
            }

            Alert.alert('Listo', 'Evento creado correctamente');
            setForm(CAMPOS_INICIALES);
            setImagenUri(null);

        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Text style={styles.title}>Crear evento</Text>

                    <Pressable style={styles.imagePicker} onPress={seleccionarImagen}>
                        {imagenUri ? (
                            <Image source={{ uri: imagenUri }} style={styles.imagePreview} />
                        ) : (
                            <Text style={styles.imagePickerText}>Tocá para subir el flyer</Text>
                        )}
                    </Pressable>

                    <TextInput
                        style={styles.input}
                        placeholder="Título del evento"
                        placeholderTextColor="#888"
                        value={form.title}
                        onChangeText={(v) => actualizarCampo('title', v)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Lugar"
                        placeholderTextColor="#888"
                        value={form.venue}
                        onChangeText={(v) => actualizarCampo('venue', v)}
                    />

                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Apertura (ej: 00:00hs)"
                            placeholderTextColor="#888"
                            value={form.openTime}
                            onChangeText={(v) => actualizarCampo('openTime', v)}
                        />
                        <TextInput
                            style={[styles.input, styles.halfInput]}
                            placeholder="Cierre (ej: 06:00hs)"
                            placeholderTextColor="#888"
                            value={form.closeTime}
                            onChangeText={(v) => actualizarCampo('closeTime', v)}
                        />
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Contacto (link de Instagram, etc.)"
                        placeholderTextColor="#888"
                        value={form.contact}
                        onChangeText={(v) => actualizarCampo('contact', v)}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="URL de Google Maps (embed)"
                        placeholderTextColor="#888"
                        value={form.mapUrl}
                        onChangeText={(v) => actualizarCampo('mapUrl', v)}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Ciudad"
                        placeholderTextColor="#888"
                        value={form.city}
                        onChangeText={(v) => actualizarCampo('city', v)}
                    />

                    <CategoryPicker
                        categorias={categoriasExistentes}
                        value={form.category}
                        onChange={(cat) => actualizarCampo('category', cat)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Fecha (YYYY-MM-DD)"
                        placeholderTextColor="#888"
                        value={form.date}
                        onChangeText={(v) => actualizarCampo('date', v)}
                    />

                    <Pressable style={styles.button} onPress={handleSubmit} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Publicar evento</Text>
                        )}
                    </Pressable>

                    <Pressable style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>Cerrar sesión</Text>
                    </Pressable>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 48,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    imagePicker: {
        height: 200,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        overflow: 'hidden',
    },
    imagePickerText: {
        color: '#888',
        fontSize: 14,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    input: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    button: {
        backgroundColor: '#ca780c',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    logoutButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    logoutText: {
        color: '#888',
        fontSize: 14,
    },
});

export default CreateEventForm;