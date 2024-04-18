import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { dmsToDecimal } from '../../utils/dmsToDecimal';




const RequestDetailsPage = ({ route }) => {
  const { request } = route.params;


  const latitude = dmsToDecimal(5, 38, 59.99, 'N');
    const longitude = dmsToDecimal(0, 10, 60.00, 'E');
  // Initialize state with undefined values for latitude and longitude
  const [region, setRegion] = useState({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    // Extract latitude and longitude from the location string
    const coordinates = request.location.split(',');
    if (coordinates.length === 2) {
      const latitude = parseFloat(coordinates[0]);
      const longitude = parseFloat(coordinates[1]);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        setRegion(prevRegion => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
      }
    }
  }, [request.location]);

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  // Check if latitude and longitude are valid before rendering the map and marker
  const isValidCoordinate = (num) => !isNaN(num) && num !== null;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{request.requestName}</Text>

      {isValidCoordinate(region.latitude) && isValidCoordinate(region.longitude) ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={region}
            onRegionChange={onRegionChange}
          >
            <Marker
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              title={request.requestName}
              description={request.requestType}
            />
          </MapView>
        </View>
      ) : (
        <Text style={styles.errorText}>Invalid location data provided.</Text>
      )}

      <View style={styles.detailContainer}>
        <Text style={styles.label}>User:</Text>
        <Text style={styles.value}>{request.userName}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Service Type:</Text>
        <Text style={styles.value}>{request.requestType}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{request.location}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: '#000',
  },
  mapContainer: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  detailContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
  value: {
    color: '#666',
  },
});

export default RequestDetailsPage;
