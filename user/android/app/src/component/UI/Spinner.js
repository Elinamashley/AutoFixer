import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import spinner from './spinner.gif'; // Ensure the gif is correctly imported

const Spinner = () => {
  return (
    <View style={styles.spinnerContainer}>
      <Image
        source={spinner}
        style={styles.spinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1, // Takes the full height of the container
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  spinner: {
    width: 200,
    height: 200 // Define height to maintain aspect ratio if needed
  }
});

export default Spinner;
