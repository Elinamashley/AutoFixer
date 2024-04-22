import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

// Dummy data for service requests
const initialRequests = [
  { id: '1', serviceType: 'Oil Change', date: '2021-07-21', status: 'Completed' },
  { id: '2', serviceType: 'Tire Repair', date: '2021-08-15', status: 'Pending' },
  { id: '3', serviceType: 'Battery Replacement', date: '2021-09-10', status: 'Completed' },
];

const UserHistoryPage = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const fetchServiceRequests = async () => {
    setLoading(true);
    // Here you would typically make an API call to fetch the requests
    // For demonstration, we're using static data
    setTimeout(() => {
      setRequests(initialRequests);
      setLoading(false);
    }, 2000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.serviceType} - {item.date}</Text>
      <Text style={styles.itemStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>hello</Text>
      {/* {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemStatus: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
});

export default UserHistoryPage;
