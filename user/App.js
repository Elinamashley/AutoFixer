import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { appStyles } from './appStyles';
import NavigationContainerWrapper from './android/app/src/component/navigation/Navigation';
import store from './android/app/src/component/redux/store';
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
    <SafeAreaView style={appStyles.safeAreaView}>
      <StatusBar />
      <ScrollView contentContainerStyle={appStyles.scrollViewContent}>
        <View style={{ flex: 1 }}>
        
          <NavigationContainerWrapper/>
         
        </View>
      </ScrollView>
    </SafeAreaView>
    </Provider>
  );
}

export default App;
