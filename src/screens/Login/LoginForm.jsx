import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import styles from './styles';

const API_BASE_URL = 'http://192.168.1.38:4001';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

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
                throw new Error(data.error || 'Error al iniciar sesión');
            }

            // Actualiza AsyncStorage Y el estado global al mismo tiempo
            await login(data.token);

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
        </KeyboardAvoidingView>
    );
};

export default LoginForm;