import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const RequestDetailsPage = ({ route }) => {
  const { request } = route.params;

  // Assuming that the location data is provided as a single string "latitude,longitude".
  const [region, setRegion] = useState({
    latitude: parseFloat(request.location.split(',')[0]),
    longitude: parseFloat(request.location.split(',')[1]),
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>{request.requestName}</Text>

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
        <Text style={styles.value}>{`${region.latitude.toFixed(3)}, ${region.longitude.toFixed(3)}`}</Text>
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
