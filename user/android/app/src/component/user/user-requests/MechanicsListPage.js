import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Linking, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import socket from '../../../api/socket';
import { assignMechanic } from '../../../api/actions/requestActions';


const MechanicsListPage = ({ mechanics, requestId }) => {
    
   
    console.log(requestId)
    const dispatch = useDispatch();

    const onOpenMap = (coordinates) => {
        const [latitude, longitude] = coordinates;
        const url = `http://maps.google.com/maps?daddr=${latitude},${longitude}`;
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    const handleAssignMechanic = (mechanicId) => {
        dispatch(assignMechanic({ requestId, mechanicId }))
            .then((response) => {
                if (response.success) {
                    Alert.alert("Request Sent", "Request sent to mechanic successfully.");
                }
            })
            .catch((error) => {
                console.error("Failed to assign mechanic", error);
                Alert.alert("Error", "Failed to send request to mechanic.");
            });
    };

    useEffect(() => {
        socket.on('assignedRequest', (data) => {
            Alert.alert('Assignment Notification', `A new request has been assigned: ${data.status}`);
        });

        socket.on('serviceRequestUpdated', (update) => {
            console.log('Service Request Update:', update);
        });

        return () => {
            socket.off('assignedRequest');
            socket.off('serviceRequestUpdated');
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Nearby Mechanics</Text>
            <FlatList
                data={mechanics}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.detailLine}><Text style={styles.title}>Shop Name: </Text>{item.shopName}</Text>
                        <Text style={styles.detailLine}><Text style={styles.title}>Services: </Text>{item.typeOfService}</Text>
                        <Text style={styles.detailLine}><Text style={styles.title}>City: </Text>{item.city}</Text>
                        <Text style={styles.detailLine}><Text style={styles.title}>Address: </Text>{item.address}</Text>
                        <View style={styles.buttonRow}>
                            {item.location && (
                                <Button
                                    title="View on Map"
                                    onPress={() => onOpenMap(item.location.coordinates)}
                                    color="#007AFF"
                                />
                            )}
                            <Button
                                title="Request This Mechanic"
                                onPress={() => handleAssignMechanic(item._id)}
                                color="#4CAF50" // A green color
                            />
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
    item: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    detailLine: {
        fontSize: 16,
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // This spreads out the buttons
        marginTop: 5,
    },
    mapButton: {
        marginRight: 10, // Optional: add some space between buttons
    }
});

export default MechanicsListPage;
