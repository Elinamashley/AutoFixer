import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import { appStyles } from './appStyles';
import NavigationContainerWrapper from './android/app/src/component/navigation/Navigation';


function App() {
  return (
    <SafeAreaView style={appStyles.safeAreaView}>
      <StatusBar />
      <ScrollView contentContainerStyle={appStyles.scrollViewContent}>
        <View style={{ flex: 1 }}>
        
          <NavigationContainerWrapper/>
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
