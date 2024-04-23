import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../styles/ServiceRequestForm';

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

    const handleFetchLocation = () => {
        requestLocationPermission(location => handleChange('location', location));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Service Request Form</Text>
            <TextInput
                style={styles.input}
                placeholder="Location (e.g., 123 Main St)"
                value={request.location}
                onChangeText={text => handleChange('location', text)}
                editable={false}  // Make it non-editable if you only want the button to set it
            />
            <Button
                title="Fetch Location"
                onPress={handleFetchLocation}
                color="#007bff"  // Use the custom blue color for the button
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
                color="#062607"  // Use the custom green color for the button
            />
        </View>
    );
};

export default ServiceRequestForm;
