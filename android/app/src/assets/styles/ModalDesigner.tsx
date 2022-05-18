/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { StyleSheet } from "react-native";

const requiredFieldColor = "#900C3F";
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
      alignItems: 'flex-start',
      borderRadius: 20,
    },
    textWrapper:{
      paddingLeft: 20,
      paddingTop: 10,
    },
    textInput: {
      fontSize: 18,
      borderBottomWidth: 2,
      width: '98%',
      borderBottomColor: '#555555',
      paddingBottom: 0,
    },
    inputWrapper:{
      marginLeft: 20,
    },
    textLabel: {
      fontSize: 18,
      color: '#bbbbbb',
    },
    labelWrapper:{
      marginBottom: -10,
    },
    text: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#000000',
    },
    deleteText: {
      fontWeight: 'bold',
      fontSize: 24,
      color: '#9B0E0E',
    },
    headerWrapper: {
      flexDirection: 'row',
      backgroundColor: '#cccccc',
      position: 'relative',
      width: '100%',
      marginBottom: 20,
    },
    crudWrapper: {
       alignItems: 'center',
       justifyContent: 'center',
       borderRadius: 10,
    },
 });

 export {modalStyles, requiredFieldColor};

