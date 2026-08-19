import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigation/TabNavigator';
import ParticularEvent from './src/screens/ParticularEvent/ParticularEvent';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="ParticularEvent" component={ParticularEvent} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}