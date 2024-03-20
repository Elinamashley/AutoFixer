import React, { useState } from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  View,
} from 'react-native';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <ImageBackground
      source={require('../../img/login.webp')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.darkOverlay}>
        <Image
          style={styles.logo}
          source={require('../../img/meUser.webp')}
        />
        <Text style={styles.text}>Kindly login as a mechanic to continue</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => console.log('Login Pressed')}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text style={styles.myText}>
          Don't have an account?{' '}
          <Text onPress={handleLoginPress} style={{ color: '#C7D1C7',fontWeight: 'bold', }}>
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
