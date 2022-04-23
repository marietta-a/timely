/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
    mainWrapper: {
     margin: 20,
     backgroundColor: 'white',
     shadowColor: '#000',
     borderRadius: 10,
     shadowOpacity: 0.25,
     shadowRadius: 3,
     shadowOffset: {
       width: 0,
       height: 2,
     },
     elevation: 10,
     height: '95%',
    },
    modalView:{
      paddingTop: 50,
      alignItems: 'center',
      borderRadius: 20,
    },
    textWrapper:{
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingLeft: 20,
      paddingTop: 10,
    },
    textInput: {
      fontSize: 18,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000000',
    },
    headerWrapper: {
      flexDirection: 'row',
      backgroundColor: '#cccccc',
      position: 'relative',
      width: '100%',
    },
    crudWrapper: {
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 10,
    },
 });

 export {modalStyles};

