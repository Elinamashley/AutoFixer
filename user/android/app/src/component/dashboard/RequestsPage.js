import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../api/socket';  // Ensure this path is correct
import { fetchCurrentUserProfile } from '../../api/actions/profileAction';
import { fetchServiceRequests } from '../../api/actions/requestActions';
const RequestPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.profile);
  
  const { requests } = useSelector(state => state.serviceRequest);
  console.log(requests,"the re re") 

  useEffect(() => {
      dispatch(fetchCurrentUserProfile());
      dispatch(fetchServiceRequests());

      // Establish connection with the WebSocket server
      socket.connect();

      // Listen for 'assignedRequest' events from the server
      socket.on('assignedRequest', (newRequest) => {
          Alert.alert("New Request", "You have a new service request assigned to you!");
      });

      return () => {
          socket.off('assignedRequest');
          socket.disconnect();
      };
  }, [dispatch]);

  const renderItem = ({ item }) => {
    // Format coordinates for display
    const coordinates = item.location && item.location.coordinates ? item.location.coordinates.join(', ') : 'Location not specified';

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('RequestDetails', { request: item })}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={styles.textContainer}>
                <Text style={styles.itemText}>Shop Name: {item.shopName}</Text>
                <Text style={styles.itemText}>Service: {item.typeOfService}</Text>
                <Text style={styles.itemSubText}>City: {item.city}</Text>
                <Text style={styles.itemSubText}>Address: {item.address}</Text>
                <Text style={styles.itemSubText}>Coordinates: {""}</Text>
            </View>
        </TouchableOpacity>
    );
};

  if (loading) {
      return (
          <View style={styles.container}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
  }

  if (!profile) {
      return (
          <View style={styles.container}>
              <Text style={styles.noProfileText}>No Profile Yet.</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditProfile')}>
                  <Text style={styles.editButtonText}>Click here to add a profile to continue</Text>
              </TouchableOpacity>
          </View>
      );
  }

  if (requests.length === 0) {
      return (
          <View style={styles.container}>
              <Text style={styles.noRequestsText}>No service requests found.</Text>
          </View>
      );
  }

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
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      color: 'white',
  },
  itemContainer: {
      flexDirection: 'row',
      padding: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 5,
  },
  textContainer: {
      flex: 1,
      marginLeft: 10,
  },
  avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
  },
  itemText: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
  },
  itemSubText: {
      color: '#666',
      fontSize: 14,
  },
  noRequestsText: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
  },
  listContainer: {
      paddingHorizontal: 10,
  },
});

export default RequestPage;



// import React, {useEffect, useState} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {View, Text, StyleSheet, TouchableOpacity, FlatList,ActivityIndicator} from 'react-native';
// import {fetchCurrentUserProfile} from '../../api/actions/profileAction';


// const requestTypes = [
//   'Air Condition Specialist',
//   'Benz Mechanic',
//   'Towing Service',
//   'Vulcanizer',
//   'MMW Mechanic',
//   'Transmission Expert',
//   'Auto Electrician',
//   'Paint Specialist',
//   'Wheel Alignment Expert',
//   'Hybrid Vehicle Specialist',
// ];



// const RequestPage = ({navigation}) => {
//   const dispatch = useDispatch();
//   const {profile} = useSelector(state => state.profile);
//   const { requests, loading, error } = useSelector(state => state.requestStore);
//   console.log(requests,"prodile")

//   useEffect(() => {
//     dispatch(fetchCurrentUserProfile());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchUserRequests('userId')); 
//   }, [dispatch]);

//   const handleAddProfilePress = () => {
//     navigation.navigate('AddEditProfile');
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!profile) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.noProfileText}>No Profile Yet.</Text>
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={handleAddProfilePress}>
//           <Text style={styles.editButtonText}>
//             Click here to add a profile to continue
//           </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.itemContainer}
//       onPress={() =>
//         navigation.navigate('RequestDetails', { request: item })
//       }>
//       <Text style={styles.itemText}>
//         {item.requestName} - {item.userName}
//       </Text>
//       <Text style={styles.itemSubText}>
//         {item.requestType} - {item.location}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Request Page</Text>
//       <FlatList
//         data={requests}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 10,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   noProfileText: {
//     fontSize: 18,
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 15, 
//     padding: 20,
//   },
//   editButton: {
//     marginTop: 20,
//     padding: 15,
//     backgroundColor: '#062607',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   editButtonText: {
//     color: '#dedede',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'white',
//     textAlign: 'center',
//   },
//   listContainer: {
//     paddingHorizontal: 10,
//   },
//   itemContainer: {
//     backgroundColor: '#062607',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   itemText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   itemSubText: {
//     color: 'lightgray',
//     fontSize: 14,
//   },
// });

// export default RequestPage;
