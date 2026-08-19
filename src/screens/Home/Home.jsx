import { View, Text, Image} from "react-native";
import { Header } from '@rneui/themed'
// import { SafeAreaView } from "react-native-safe-area-context"; deprecado
import { SafeAreaProvider } from "react-native-safe-area-context";

const Home = () => {
    return (
        <SafeAreaProvider style={{ flex: 1, paddingTop: 0 }}>
            <Header
                leftComponent= {{icon: 'menu', color: '#fff'}}
                centerComponent= {{text: '+joditas', style: { color: '#000'}}}
                rightComponent={{icon: 'home', color: '#fff'}}
            />
        <Image 
            source = {require('../../assets/images/ppal.jpg')} 
            style={{width: 400, height: 400}}
        />

        </SafeAreaProvider>
    );
};

export default Home;