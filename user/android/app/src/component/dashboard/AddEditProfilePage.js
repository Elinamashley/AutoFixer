import { useDispatch } from 'react-redux';
import { createOrUpdateProfile } from '../../api/actions/profileAction';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { requestLocationPermission } from '../../utils/requestPermision';
import { useEffect, useLayoutEffect, useState } from 'react';

const AddEditProfilePage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    shopName: '',
    typeOfService: '',
    city: '',
    address: '',
    location: '',
    avatar: '',
  });

  useEffect(() => {
    if (route.params?.profile) {
      setFormData({ ...route.params.profile });
    }
  }, [route.params?.profile]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.profile ? 'Edit Profile' : 'Add Profile',
    });
  }, [navigation, route.params?.profile]);

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFetchLocation = () => {
    requestLocationPermission(location => handleInputChange('location', location));
  };
  const handleSelectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const {uri} = response.assets[0];
        setFormData({...formData, avatar: uri});
      }
    });
  };

  const handleSaveProfile = async () => {
    console.log(formData,"the form data")
    try {
      let response = await dispatch(createOrUpdateProfile(formData));
      if (response.success === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeader}>
        {route.params?.profile ? 'Edit Your Profile' : 'Create Your Profile'}
      </Text>
      
      {formData.avatar ? (
        <Image source={{ uri: formData.avatar }} style={styles.avatar} />
      ) : null}

      {route.params?.profile && (
        <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
          <Text style={styles.imageButtonText}>Select Image</Text>
        </TouchableOpacity>
      )}

      <TextInput
        style={styles.input}
        value={formData.shopName}
        onChangeText={text => handleInputChange('shopName', text)}
        placeholder="Shop Name"
      />
      <TextInput
        style={styles.input}
        value={formData.typeOfService}
        onChangeText={text => handleInputChange('typeOfService', text)}
        placeholder="Type of Service"
      />
      <TextInput
        style={styles.input}
        value={formData.city}
        onChangeText={text => handleInputChange('city', text)}
        placeholder="City"
      />
      <TextInput
        style={styles.input}
        value={formData.address}
        onChangeText={text => handleInputChange('address', text)}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        value={formData.location}
        onChangeText={text => handleInputChange('location', text)}
        placeholder="Location (Optional)"
      />
      <Button title="Fetch Location" onPress={handleFetchLocation} color="#062607" />
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pageHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#062607',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  imageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  imageButtonText: {
    color: 'white',
  },
});

export default AddEditProfilePage;
