import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import spinner from './spinner.gif';

export const Spinner = () => (
  <View style={styles.container}>
    <Image source={spinner} style={styles.spinner} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 200,
    height: 200,
  },
});

