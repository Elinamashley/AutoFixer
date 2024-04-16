import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

// store our JWT in LS and set axios headers if we do have a token

export const setAuthToken = async (token, expirationTimestamp) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    await AsyncStorage.setItem('token', token);
    if (expirationTimestamp) {
      await AsyncStorage.setItem('tokenExpiration', expirationTimestamp.toString());
    }
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('tokenExpiration');
  }
};

export default setAuthToken;
