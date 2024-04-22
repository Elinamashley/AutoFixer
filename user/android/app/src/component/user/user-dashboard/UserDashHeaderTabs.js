import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserRequestPage from '../user-requests/UserRequest';
import UserHistoryPage from '../user-requests/UserHistory';

const Tab = createMaterialTopTabNavigator();

const UserDashHeaderTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Requests"
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#062607' },
      }}
    >
      <Tab.Screen name="Requests" component={UserRequestPage} options={{ tabBarLabel: 'Requests' }} />
      <Tab.Screen name="History" component={UserHistoryPage} options={{ tabBarLabel: 'History' }} />
    </Tab.Navigator>
  );
};

export default UserDashHeaderTabs;
