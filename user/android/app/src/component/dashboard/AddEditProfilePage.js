import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createOrUpdateProfile } from '../../api/actions/profileAction';
import Toast from 'react-native-toast-message';
import { requestLocationPermission } from '../../utils/requestPermision';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/AddEditProfilePageStyles';

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
  const [loading, setLoading] = useState(false); // New state for managing loading status

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

  const handleFetchLocation = async () => {
    setLoading(true); // Start loading
    await requestLocationPermission(location => {
      handleInputChange('location', location);
      setLoading(false); // Stop loading after location is fetched
    });
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
    setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // Stop loading regardless of the outcome
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.buttonRow}>
        <Button title="Fetch Location" onPress={handleFetchLocation} color="#007AFF" />
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddEditProfilePage;
