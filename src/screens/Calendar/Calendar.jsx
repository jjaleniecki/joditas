import { View, Text } from "react-native";
import { Header } from '@rneui/themed'
import { SafeAreaProvider } from "react-native-safe-area-context";

const Calendar= () => {
    return (
        <SafeAreaProvider style={{ flex: 1, padding: 0 }}>
            <Header
                leftComponent= {{icon: 'menu', color: '#fff'}}
                centerComponent= {{text: '+joditas', style: { color: '#000'}}}
                rightComponent={{icon: 'home', color: '#fff'}}
            />
            <Text>Calendar</Text>
        </SafeAreaProvider>
    );
};
export default Calendar;
