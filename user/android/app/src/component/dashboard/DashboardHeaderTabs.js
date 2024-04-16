import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HistoryPage from './HistoryPage';
import ProfilePage from './ProfilePage';
import RequestPage from './RequestsPage';

const Tab = createMaterialTopTabNavigator();

const DashboardHeaderTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Requests"
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#062607' },
      }}
    >
      <Tab.Screen name="Requests" component={RequestPage} options={{ tabBarLabel: 'Requests' }} />
      <Tab.Screen name="Profile" component={ProfilePage} options={{ tabBarLabel: 'Profile' }} />
      <Tab.Screen name="History" component={HistoryPage} options={{ tabBarLabel: 'History' }} />
    </Tab.Navigator>
  );
};

export default DashboardHeaderTabs;
