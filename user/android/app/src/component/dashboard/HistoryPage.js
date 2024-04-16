import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';

const HistoryPage = () => {
 


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>History page</Text>
      
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    
    },
    editButton: {
      marginTop: 30,
      backgroundColor: '#062607', 
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    avatar: {
      width: 100, 
      height: 100, 
      borderRadius: 50, 
      marginBottom: 20,
      backgroundColor:"#dedede"  
    },
    editButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'white',
      textAlign: 'center',
    },
    detailContainer: {
      marginBottom: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    label: {
      fontWeight: 'bold',
      color: 'lightgray',
      flexBasis: '40%',
    },
    value: {
      color: 'white',
      flexBasis: '60%',
      flexWrap: 'wrap',
    },
    noProfileText: {
      color: 'white',
      textAlign: 'center',
      marginTop: 20,
    },
  });
export default HistoryPage;
