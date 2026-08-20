import { View, Text } from "react-native";
import { Header } from '@rneui/themed'
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './styles'; //estilos de su carpeta

const Search= () => {
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: '#111' }} edges={['bottom', 'left', 'right']}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                placement="center"
                // leftComponent={{icon: 'menu', color: '#000'}}
                centerComponent={{ text: '+joditas', style: { color: '#888', fontSize: 18, fontWeight: 'bold' } }}
                // rightComponent={{icon: 'search', color: '#000'}}
                containerStyle={{
                    backgroundColor: '#111',
                    borderBottomWidth: 0,
                }}
            />
        </SafeAreaView>
    );
};
export default Search;
