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

import React from 'react';
import {
  SafeAreaView,
} from 'react-native';
import HeaderElement from './android/app/src/common/HeaderElement';

import SubjectPage from './android/app/src/pages/subject/SubjectPage';


const App = () => {

  /*
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  */

  return (
    <SafeAreaView>
      <HeaderElement title='Subjects'/>
     <SubjectPage/>
    </SafeAreaView>
  );
};


export default App;
