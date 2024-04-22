import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ServiceRequestForm = ({ onSubmit, requestLocationPermission }) => {
    const [request, setRequest] = useState({
        location: '',
        carType: '',
        serviceType: '',
        description: '',
        serviceTime: new Date(),
    });
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const handleChange = (name, value) => {
        setRequest(prevRequest => ({
            ...prevRequest,
            [name]: value
        }));
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || request.serviceTime;
        setDatePickerVisible(false);
        setRequest(prevRequest => ({
            ...prevRequest,
            serviceTime: currentDate
        }));
    };

    return (
        <View>
            <Text style={styles.header}>Service Request Form</Text>
            <Button
                title="Fetch Location"
                onPress={() => requestLocationPermission((location) => handleChange('location', location))}
                color="#062607"
            />
            <TextInput
                style={styles.input}
                placeholder="Car Type (e.g., Sedan, SUV)"
                value={request.carType}
                onChangeText={text => handleChange('carType', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Service Type (e.g., Oil Change, Tire Repair)"
                value={request.serviceType}
                onChangeText={text => handleChange('serviceType', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                multiline
                numberOfLines={4}
                value={request.description}
                onChangeText={text => handleChange('description', text)}
            />
            <Text style={styles.label}>Service Time:</Text>
            <Text onPress={() => setDatePickerVisible(true)} style={styles.dateText}>
                {request.serviceTime.toLocaleDateString()} {request.serviceTime.toLocaleTimeString()}
            </Text>
            {datePickerVisible && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={request.serviceTime}
                    mode="datetime"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}
                />
            )}
            <Button
                title="Submit Request"
                onPress={() => onSubmit(request)}
                color="#062607"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 50,
        marginBottom: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc'
    },
    dateText: {
        fontSize: 16,
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 10
    }
});

export default ServiceRequestForm;
