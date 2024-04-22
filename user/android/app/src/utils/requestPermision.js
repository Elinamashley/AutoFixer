import { PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

// Function to request permission and fetch current location
export const requestLocationPermission = async (updateLocation) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "This app needs access to your location to use this feature.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          updateLocation(`${latitude}, ${longitude}`);
        },
        error => {
          console.error(error);
          Alert.alert('Error', 'Unable to fetch location');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Alert.alert('Permission Denied', 'Location permission is not granted');
    }
  } catch (err) {
    console.warn(err);
  }
};
