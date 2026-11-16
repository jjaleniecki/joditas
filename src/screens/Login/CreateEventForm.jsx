import React, { useState, useMemo } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { File } from 'expo-file-system';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventsContext';
import CategoryPicker from '../../components/CategoryPicker/CategoryPicker';

import { API_BASE_URL } from '../../utils/api';
import styles from './styles';

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

    const { token, logout } = useAuth();
    const { events, addEvent } = useEvents();

    // Categorías existentes (chips): se derivan de los eventos del context,
    // así una categoría nueva aparece apenas se publica el evento
    const categoriasExistentes = useMemo(
        () => [...new Set(events.map((e) => e.category).filter(Boolean))],
        [events]
    );

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
            mediaTypes: ['images'],
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

        const formatoHoraValido = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
        if (!formatoHoraValido.test(form.openTime) || !formatoHoraValido.test(form.closeTime)) {
            Alert.alert('Formato de hora inválido', 'Ingresá la apertura y el cierre en formato HH:MM (por ejemplo, 00:30)');
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

            // File de expo-file-system se comporta como Blob, el fetch nuevo lo acepta directo
            formData.append('img', new File(imagenUri));

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

            // El POST devuelve el evento creado: lo sumamos al context
            // y Home/Calendar se actualizan solos
            addEvent({ ...data, previewUri: imagenUri });

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
            style={styles.eventFormKeyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.eventFormContainer} keyboardShouldPersistTaps="handled">
                    <Text style={styles.eventFormTitle}>Crear evento</Text>

                    <Pressable style={styles.eventImagePicker} onPress={seleccionarImagen}>
                        {imagenUri ? (
                            <Image source={{ uri: imagenUri }} style={styles.eventImagePreview} />
                        ) : (
                            <Text style={styles.eventImagePickerText}>Tocá para subir el flyer</Text>
                        )}
                    </Pressable>

                    <TextInput
                        style={styles.eventFormInput}
                        placeholder="Título del evento"
                        placeholderTextColor="#888"
                        value={form.title}
                        onChangeText={(v) => actualizarCampo('title', v)}
                    />

                    <TextInput
                        style={styles.eventFormInput}
                        placeholder="Lugar"
                        placeholderTextColor="#888"
                        value={form.venue}
                        onChangeText={(v) => actualizarCampo('venue', v)}
                    />

                    <View style={styles.eventFormRow}>
                        <TextInput
                            style={[styles.eventFormInput, styles.eventFormHalfInput]}
                            placeholder="Apertura (HH:MM)"
                            placeholderTextColor="#888"
                            value={form.openTime}
                            onChangeText={(v) => actualizarCampo('openTime', v)}
                            maxLength={5}
                        />
                        <TextInput
                            style={[styles.eventFormInput, styles.eventFormHalfInput]}
                            placeholder="Cierre (HH:MM)"
                            placeholderTextColor="#888"
                            value={form.closeTime}
                            onChangeText={(v) => actualizarCampo('closeTime', v)}
                            maxLength={5}
                        />
                    </View>

                    <TextInput
                        style={styles.eventFormInput}
                        placeholder="Contacto (link de Instagram, etc.)"
                        placeholderTextColor="#888"
                        value={form.contact}
                        onChangeText={(v) => actualizarCampo('contact', v)}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.eventFormInput}
                        placeholder="URL de Google Maps (embed)"
                        placeholderTextColor="#888"
                        value={form.mapUrl}
                        onChangeText={(v) => actualizarCampo('mapUrl', v)}
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.eventFormInput}
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
                        style={styles.eventFormInput}
                        placeholder="Fecha (YYYY-MM-DD)"
                        placeholderTextColor="#888"
                        value={form.date}
                        onChangeText={(v) => actualizarCampo('date', v)}
                    />

                    <Pressable style={styles.eventFormButton} onPress={handleSubmit} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.eventFormButtonText}>Publicar evento</Text>
                        )}
                    </Pressable>

                    <Pressable style={styles.eventFormLogoutButton} onPress={logout}>
                        <Text style={styles.eventFormLogoutText}>Cerrar sesión</Text>
                    </Pressable>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default CreateEventForm;