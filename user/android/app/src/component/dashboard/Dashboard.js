// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
// import { fetchCurrentUserProfile } from '../../api/actions/profileAction';
// import DashboardHeaderTabs from './DashboardHeaderTabs';

// const DashboardPage = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const profile = useSelector((state) => state.profile);

//   useEffect(() => {
//     dispatch(fetchCurrentUserProfile());
//   }, [dispatch]);

//   const handleProfilePress = () => {
//     navigation.navigate('AddEditProfile');
//   };

//   return (
//     <View style={styles.container}>
//       {/* Render the header tabs directly over the background */}
//       <View style={{ zIndex: 999 }}>
//       <Text style={styles.logo}>AutoFixer</Text>
//     <DashboardHeaderTabs />
//   </View>

//       {/* Overlay and content */}
     
        
//         <Text style={styles.heading}>Mechanic Dashboard</Text>

//         {profile !== null ? (
//           <View>
//             {/* Placeholder for profile content or other content */}
//           </View>
//         ) : (
//           <Text style={styles.infoText}>
//             No Profile Yet,{' '}
//             <TouchableOpacity onPress={handleProfilePress}>
//               <Text style={styles.clickHereText}>Click here</Text>
//             </TouchableOpacity>{' '}
//             to add a Profile to Continue
//           </Text>
//         )}

//         {!profile && (
//           <Text style={styles.infoText}>Tap above to add your profile and get started!</Text>
//         )}
     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   logo: {
//     textAlign: 'center',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   heading: {
//     color: 'white',
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 30,
//   },
//   // ... add other styles you may need
//   logo: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//     width:"100%",
//     marginBottom: 20, // Adjust as needed
//   },
//   clickHereText: {
//     color: '#FFF', // or any other color for clickable text
//     fontWeight: 'bold',
//   },
//   infoText: {
//     color: 'white',
//     marginTop: 20,
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });

// export default DashboardPage;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DashboardHeaderTabs from './DashboardHeaderTabs'; 

const DashboardPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>AutoFixer-Mechanic</Text>
      <DashboardHeaderTabs />
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

export default DashboardPage;
