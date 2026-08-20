import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuth } from '../../context/AuthContext';
import LoginForm from './LoginForm';
import CreateEventForm from './CreateEventForm';

const Login = () => {
    const { isLoggedIn, isLoading } = useAuth();

    return (
        <SafeAreaProvider style={{ flex: 1, paddingTop: 0, backgroundColor: '#111' }}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                placement="center"
                centerComponent={{
                    text: '+joditas',
                    style: { color: '#888', fontSize: 18, fontWeight: 'bold' },
                }}
                containerStyle={{
                    backgroundColor: '#111',
                    borderBottomWidth: 0,
                }}
            />

            {isLoading ? (
                // Mientras chequea AsyncStorage al arrancar la app
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator color="#ca780c" size="large" />
                </View>
            ) : isLoggedIn ? (
                <CreateEventForm />
            ) : (
                <LoginForm />
            )}
        </SafeAreaProvider>
    );
};

export default Login;