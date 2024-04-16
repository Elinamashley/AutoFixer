import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../../pages/login-page/Login';
import LandingPage from '../../pages/landing-page/Landingpage';
import SignupPage from '../../pages/signup-page/Signup';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import DashboardPage from '../dashboard/Dashboard';
import AddEditProfilePage from '../dashboard/AddEditProfilePage';
import RequestDetailsPage from '../dashboard/RequestDetailsPage';

const Stack = createNativeStackNavigator();
const NavigationContainerWrapper = () => {
  const [initialRoute, setInitialRoute] = useState('LandingPage');
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="LandingPage"
            component={LandingPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupPage}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Dashboard"
            component={DashboardPage}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name="AddEditProfile"
            component={AddEditProfilePage}
          />
           <Stack.Screen
            name="RequestDetails"
            component={RequestDetailsPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="top" />
    </>
  );
};

export default NavigationContainerWrapper;
