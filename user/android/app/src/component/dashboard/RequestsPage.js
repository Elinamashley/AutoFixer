import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {fetchCurrentUserProfile} from '../../api/actions/profileAction';
import ProfilePage from './ProfilePage';

// List of request types
const requestTypes = [
  'Air Condition Specialist',
  'Benz Mechanic',
  'Towing Service',
  'Vulcanizer',
  'MMW Mechanic',
  'Transmission Expert',
  'Auto Electrician',
  'Paint Specialist',
  'Wheel Alignment Expert',
  'Hybrid Vehicle Specialist',
];

// Dummy data array for requests
const requests = Array.from({length: 10}, (_, index) => ({
  id: index + 1,
  requestName: `Request #${index + 1}`,
  userName: `User ${index + 1}`,
  requestType: requestTypes[Math.floor(Math.random() * requestTypes.length)],
  location: `Location ${Math.floor(Math.random() * 5) + 1}`,
}));

const RequestPage = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);

  useEffect(() => {
    dispatch(fetchCurrentUserProfile());
  }, [dispatch]);

  const handleAddProfilePress = () => {
    navigation.navigate('AddEditProfile');
  };

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.noProfileText}>No Profile Yet.</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handleAddProfilePress}>
          <Text style={styles.editButtonText}>
            Click here to add a profile to continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate('RequestDetails', { request: item })
      }>
      <Text style={styles.itemText}>
        {item.requestName} - {item.userName}
      </Text>
      <Text style={styles.itemSubText}>
        {item.requestType} - {item.location}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Request Page</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  noProfileText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15, 
    padding: 20,
  },
  editButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#062607',
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#dedede',
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
  listContainer: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#062607',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubText: {
    color: 'lightgray',
    fontSize: 14,
  },
});

export default RequestPage;
