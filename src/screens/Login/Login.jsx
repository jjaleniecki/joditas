import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; 
import { Keyboard, TouchableWithoutFeedback } from 'react-native'; //para tocar y que cierre el teclado sjkehjkd
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.38:4001';

const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !pass) {
            Alert.alert('Faltan datos', 'Completá usuario y contraseña');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/login.html`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pass }),
            });

            const data = await response.json();

            if (!response.ok) {
                // El server responde 401 con { error: "Invalid credentials" }
                throw new Error('Error al iniciar sesión');
            }

            // Guardamos el token para mandarlo en próximos requests protegidos
            await AsyncStorage.setItem('token', data.token);
            console.log('Token guardado:', data.token);

            Alert.alert('Listo', 'Sesión iniciada correctamente');
            // Acá más adelante: navegar a otra pantalla, actualizar estado global, etc.

        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaProvider style={{ flex: 1, paddingTop: 0, backgroundColor: '#111' }}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                placement="center"
                centerComponent={{ text: '+joditas', style: { color: '#888', fontSize: 18, fontWeight: 'bold' } }}
                containerStyle={{
                    backgroundColor: '#111',
                    borderBottomWidth: 0,
                }}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.title}>Iniciar sesión</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor="#888"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />

                    <View style={styles.passwordWrapper}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Contraseña"
                            placeholderTextColor="#888"
                            value={pass}
                            onChangeText={setPass}
                            secureTextEntry={!showPass}
                        />
                        <Pressable onPress={() => setShowPass(!showPass)} style={styles.eyeIcon}>
                            <Ionicons
                                name={showPass ? 'eye-off-outline' : 'eye-outline'}
                                size={22}
                                color="#888"
                            />
                        </Pressable>
                    </View>

                    <Pressable
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Ingresar</Text>
                        )}
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
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
    passwordWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    passwordInput: {
        flex: 1,
        color: '#fff',
        paddingVertical: 12,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 4,
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
});

export default Login;