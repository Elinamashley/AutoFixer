import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import ServiceRequestForm from './ServiceRequestForm';
import MechanicsListPage from './MechanicsListPage';
import { useDispatch } from 'react-redux';
import { createOrUpdateServiceRequest, findMechanics } from '../../../api/actions/requestActions';
import { requestLocationPermission } from '../../../utils/requestPermision';

const UserRequestPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const [mechanics, setMechanics] = useState([]);
    const [requestSubmitted, setRequestSubmitted] = useState(false);
    const [requestId, setRequestId] = useState(null)
    const handleSubmit = async (request) => {
        console.log('Submitting request:', request);
        try {
            let response = await dispatch(createOrUpdateServiceRequest(request));
            if (response.success) {
                setRequestId(response.data._id);
                let mechanicsResponse = await dispatch(findMechanics(request.location, request.serviceType));
                if (mechanicsResponse.success && mechanicsResponse.data.length > 0) {
                    setMechanics(mechanicsResponse.data);
                    setRequestSubmitted(true); // Switch view to show mechanics
                } else {
                    Alert.alert('No mechanics found', 'Try adjusting your service request details.');
                }
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Service Request Failed', 'Unable to submit your service request.');
        }
    };

    if (requestSubmitted && mechanics.length > 0) {
        return (
            <View style={{ flex: 1 }}>
                <MechanicsListPage mechanics={mechanics} requestId={requestId}  />
            </View>
        );
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ServiceRequestForm onSubmit={handleSubmit} requestLocationPermission={requestLocationPermission} />

        </ScrollView>
    );
};

export default UserRequestPage;
