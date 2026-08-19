import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import styles from './styles'; //estilos de su carpeta

const ParticularEvent= () => {
	return (
        <SafeAreaProvider style={{ flex: 1, padding: 16 }}>
            <Text>Eventos</Text>
        </SafeAreaProvider>
    );
};
export default ParticularEvent;
