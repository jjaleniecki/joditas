import React from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    Linking,
    StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles'; //estilos de su carpeta

const API_BASE_URL = 'http://192.168.1.38:4001';

const ParticularEvent = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { evento } = route.params;

    const imageUrl = `${API_BASE_URL}/images/${evento.img}`;
    const dateString = new Date(evento.date).toLocaleDateString();

    const abrirContacto = () => {
        Linking.openURL(evento.contact);
    };

    const abrirMapa = () => {
        Linking.openURL(evento.mapUrl);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageWrapper}>
                    <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />

                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </Pressable>
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>{evento.title}</Text>

                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={18} color="#ca780c" />
                        <Text style={styles.infoText}>{evento.venue}, {evento.city}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="calendar-outline" size={18} color="#ca780c" />
                        <Text style={styles.infoText}>{dateString}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="time-outline" size={18} color="#ca780c" />
                        <Text style={styles.infoText}>
                            {evento.openTime} - {evento.closeTime}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Ionicons name="pricetag-outline" size={18} color="#ca780c" />
                        <Text style={styles.infoText}>{evento.category}</Text>
                    </View>

                    <Pressable style={styles.button} onPress={abrirContacto}>
                        <Ionicons name="logo-instagram" size={18} color="#fff" />
                        <Text style={styles.buttonText}>Contacto</Text>
                    </Pressable>

                    <Pressable style={[styles.button, styles.buttonOutline]} onPress={abrirMapa}>
                        <Ionicons name="map-outline" size={18} color="#ca780c" />
                        <Text style={[styles.buttonText, styles.buttonTextOutline]}>Ver ubicación</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ParticularEvent;