import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';

const LandingPage = ({ navigation }) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      style={styles.scrollView}
    >
      <Image
        source={require('../../img/background.webp')} // Adjust the path accordingly
        style={styles.backgroundImage}
      />
      <View style={styles.darkOverlay}>
        <View style={styles.landingInner}>
          <Text style={styles.xLarge}>AutoFixer</Text>
          <Text style={styles.lead}>
            Get instant help when you need it most. Connect to the nearest towing service or mechanic when you need one.
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setSignupModalVisible(true)}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lightButton} onPress={() => setLoginModalVisible(true)}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Login Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={loginModalVisible}
        onRequestClose={() => {
          setLoginModalVisible(!loginModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Login as:</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
                navigation.navigate('Login', { userType: 'mechanic' });
                setLoginModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Mechanic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
                navigation.navigate('Login', { userType: 'user' });
                setLoginModalVisible(false);
              }}>
              <Text style={styles.buttonText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setLoginModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Signup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={signupModalVisible}
        onRequestClose={() => {
          setSignupModalVisible(!signupModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sign up as:</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
                navigation.navigate('Signup', { userType: 'mechanic' });
                setSignupModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Mechanic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => {
                navigation.navigate('Signup', { userType: 'user' });
                setSignupModalVisible(false);
              }}>
              <Text style={styles.buttonText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSignupModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    height: screenHeight, // Set height to full screen height
  },
  scrollView: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  darkOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    flex: 1,
    width: '100%', // Ensure overlay covers the entire screen
    alignItems: 'center',
    justifyContent: 'center', 
  },
  landingInner: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  xLarge: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  lead: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  primaryButton: {
    backgroundColor: '#062607',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 5,
  },
  lightButton: {
    backgroundColor: '#2D2F34',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#062607',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#999',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default LandingPage;
