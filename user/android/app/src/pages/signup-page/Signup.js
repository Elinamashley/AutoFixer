import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { signupActions } from '../../api/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

const SignupPage = ({ navigation }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleInputChange = (inputName, value) => {
    setForm(currentForm => ({
      ...currentForm,
      [inputName]: value,
    }));
  };


  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading);

  


  const onSubmit = async () => {
    try {
      const requestData = {
        name: form.name, 
        email: form.email, 
        password: form.password
      };
      let response = await dispatch(signupActions(requestData));
      if (response.success===true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Signup successful',
        });
        navigation.navigate('Login')
      }
    } catch (error) {
    }
  };


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <ImageBackground
      source={require('../../img/login.webp')} // Replace with your background image path
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          style={styles.logo}
          source={require('../../img/meUser.webp')} // Replace with your logo URL
        />
        <Text style={styles.text}>Sign up as a mechanic to continue</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputChange('name', value)}
          value={form.name}
          placeholder="Name"
          placeholderTextColor="#2D2F34"
        />
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputChange('email', value)}
          value={form.email}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#2D2F34"
        />
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputChange('password', value)}
          value={form.password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#2D2F34"
        />
        <TextInput
          style={styles.input}
          onChangeText={value => handleInputChange('confirmPassword', value)}
          value={form.confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          placeholderTextColor="#2D2F34"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.myText}>
          Already have an account?{' '}
          <Text onPress={handleLoginPress} style={styles.linkText}>
            Log in
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // This is the overlay color with opacity
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Control the width of the input
    color: "black",
    borderColor: '#2D2F34', 
    backgroundColor: '#DCE1DC',  // White background for inputs
  },
  button: {
    backgroundColor: '#062607', // Mechanic blue for buttons
    color: 'white',
    width: '80%',
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  text: {
    marginBottom: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  myText: {
    color: "white",
    marginTop: 15,
  },
  linkText: {
    color: '#C7D1C7',
    fontWeight: 'bold',
  }
});

export default SignupPage;
