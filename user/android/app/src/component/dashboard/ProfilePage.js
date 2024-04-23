import React, { useEffect } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { fetchCurrentUserProfile } from '../../api/actions/profileAction';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = ({ navigation }) => {
 const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.profile);
  console.log(profile,"mailprofile")

  console.log(profile,"the profile inside")
  const handleEditPress = () => {
    navigation.navigate('AddEditProfile', { profile });
  };

  useEffect(() => {
    dispatch(fetchCurrentUserProfile());
  }, [dispatch]);

  const avatarURL = profile?.user?.avatar?.split(' ')[0]; 
  const coordinates = profile?.location?.coordinates?.join(', ') || 'No location specified'; // Join coordinates as a string
 
  if (!profile) {
    return (
      <View style={styles.noProfileContainer}>
        <Text style={styles.noProfileText}>No profile data available.</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('AddEditProfile')}>
          <Text style={styles.editButtonText}>Add Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Details</Text>
      {avatarURL && (
        <Image source={{ uri: avatarURL }} style={styles.avatar} />
      )}
      <View style={styles.detailContainer}>
        <Text style={styles.label}>Shop Name:</Text>
        <Text style={styles.value}>{profile.shopName}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Type of Service:</Text>
        <Text style={styles.value}>{profile.typeOfService}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{profile.city}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{profile.address}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{coordinates}</Text>
      </View>

      <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  noProfileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editButton: {
    marginTop: 30,
    backgroundColor: '#062607', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    marginBottom: 20,
    backgroundColor: "#dedede",
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#062607',
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: 'lightgray',
    fontSize: 14,
  },
  value: {
    color: 'white',
    fontSize: 14,
  },
  noProfileText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
});


export default ProfilePage;
