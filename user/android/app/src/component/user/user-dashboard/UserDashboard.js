

// export default DashboardPage;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import UserDashHeaderTabs from './UserDashHeaderTabs';

const UserDashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AutoFixer-User</Text>
      <UserDashHeaderTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});

export default UserDashboard;
