/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';
import { CustomDrawerContent } from './android/app/src/common/main/CustomDrawerSettings';
import { EventScreen, MarkScreen, SubjectScreen } from './android/app/src/screens/Screen';
import SQLite from 'react-native-sqlite-storage';
import EventCRUD from './android/app/src/assets/crud/EventCRUD';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);



const Drawer = createDrawerNavigator();
const App = () => {
  return (
    <NavigationContainer>
       <Drawer.Navigator
         initialRouteName="Subjects"
         useLegacyImplementation
         drawerContent={(props)=> <CustomDrawerContent {...props}/>}
        >
          <Drawer.Screen name="Subjects" component={SubjectScreen} />
          <Drawer.Screen name="Events" component={EventScreen} />
          <Drawer.Screen name="Marks" component={MarkScreen} />
       </Drawer.Navigator>
    </NavigationContainer>
  );
};


export default App;
