import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Calendar= () => {
    return (
        <SafeAreaProvider style={{ flex: 1, padding: 16 }}>
            <Text>Calendar</Text>
        </SafeAreaProvider>
    );
};
export default Calendar;
