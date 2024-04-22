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
import UserRequestPage from '../user/user-requests/UserRequest';
import UserHistoryPage from '../user/user-requests/UserHistory';
import UserDashboard from '../user/user-dashboard/UserDashboard';

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
          <Stack.Screen name="AddEditProfile" component={AddEditProfilePage} />
          <Stack.Screen name="RequestDetails" component={RequestDetailsPage} />
          <Stack.Screen name="UserRequestPage" component={UserRequestPage} />
          <Stack.Screen name="UserHistoryPage" component={UserHistoryPage} />
          <Stack.Screen name="UserDashboard" component={UserDashboard} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="top" />
    </>
  );
};

export default NavigationContainerWrapper;
