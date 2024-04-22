import React, { useState } from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  View,
  ActivityIndicator
} from 'react-native';
import { loginActions } from '../../api/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

const LoginPage = ({ navigation, route }) => {
  const { userType } = route.params;
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backgroundImage = userType === 'mechanic' ? require('../../img/login.webp') : require('../../img/user.webp');
const textUser = userType === "mechanic" ? "Kindly login as a mechanic to continue":"Kindly login as a user to continue"

  const onSubmit = async () => {
    try {
      const requestData = { email, password };
      let response = await dispatch(loginActions(requestData));
      if(response.success === true){
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Login successful',
        });
        // await AsyncStorage.setItem('userType', userType);
        if (userType === 'mechanic') {
          navigation.navigate('Dashboard'); 
        } else {
          navigation.navigate('UserDashboard');
        }
      }
    } catch (error) {
      // console.error('Login failed', error);
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
      source={backgroundImage}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay}>
        <Image
          style={styles.logo}
          source={require('../../img/meUser.webp')}
        />
        <Text style={styles.text}>{textUser}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="User Email"
          placeholderTextColor="#2D2F34"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          placeholderTextColor="#2D2F34"
        />
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.myText}>
          Don't have an account?{' '}
          <Text onPress={() => navigation.navigate('Signup', { userType: userType })} style={{ color: '#C7D1C7', fontWeight: 'bold' }}>
            Sign Up
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%', // Control the width of the input
    color: "black",
    borderColor: '#2D2F34', 
    backgroundColor: '#DCE1DC', 
  },
  button: {
    backgroundColor: '#062607', 
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
    marginTop: 15
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject, // This covers the entire screen with the overlay
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust the opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPage;
