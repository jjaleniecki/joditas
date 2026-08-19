import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Login= () => {
    return (
        <SafeAreaProvider style={{ flex: 1, padding: 16 }}>
            <Text>Iniciar Sesion</Text>
        </SafeAreaProvider>
    );
};

export default Login;