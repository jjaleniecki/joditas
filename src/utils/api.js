import Constants from 'expo-constants';


const hostUri = Constants.expoConfig?.hostUri;
const host = hostUri ? hostUri.split(':')[0] : 'localhost';

export const API_BASE_URL = `http://${host}:4001`;