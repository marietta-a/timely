/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {View, Pressable, Text, StyleSheet, Alert} from 'react-native';
import { modalStyles } from '../assets/styles/ModalDesigner';
import { ModalBuilder } from './ModalBuilder';

const ModalHeader: React.FC<{
  textWrapper?: any,
  textStyle?: any,
  deleteTextStyle?: any,
  onRequestClose?: any,
  handleSave?: any,
  handleDelete?: any,
  deleteVisible: boolean,
}> = ({textWrapper, textStyle, deleteTextStyle, onRequestClose, handleSave, handleDelete, deleteVisible}) => {
    textWrapper = textWrapper == null ? modalStyles.textWrapper : textWrapper;
    textStyle = textStyle == null ? modalStyles.text : textStyle;
    deleteTextStyle = deleteTextStyle == null ? modalStyles.deleteText : deleteTextStyle;
    const saveClick = () => {
      handleSave();
      onRequestClose();
    };
    const deleteClick = () => {
       Alert.alert(
         "",
         "Are you sure you want to delete this record?",
         [
           {
             text: 'Cancel',
             onPress: () => {onRequestClose();},
             style:'default',
           },
           {
             text: 'Confirm',
             onPress: () => {
               handleDelete();
               onRequestClose();
             },
             style:'destructive',
           },
         ]
       )
    }
    if(deleteVisible){
      return (
          <View style={modalStyles.headerWrapper}>
            <Pressable style={textWrapper} onPress={onRequestClose.bind(this)}>
              <Text style={textStyle}>X</Text>
            </Pressable>
            <View style={{justifyContent: 'center', alignItems:'center', width:'20%'}}/>
            <Pressable style={textWrapper} onPress={deleteClick.bind(this)}>
              <Text style={deleteTextStyle}>Delete</Text>
            </Pressable> 
            <View style={{justifyContent: 'center', alignItems:'center', width:'20%'}}/>
            <Pressable style={modalStyles.crudWrapper} onPress={() => saveClick()}>
              <Text style={modalStyles.text}>Save</Text>
            </Pressable>
          </View>
      );
    }
    else{
      return (
          <View style={modalStyles.headerWrapper}>
            <Pressable style={textWrapper} onPress={onRequestClose}>
              <Text style={textStyle}>X</Text>
            </Pressable>
            <View style={{justifyContent: 'center', alignItems:'center', width:'65%'}}/>
            <Pressable style={modalStyles.crudWrapper} onPress={() => saveClick()}>
              <Text style={modalStyles.text}>Save</Text>
            </Pressable>
          </View>
      );
    }
};

const styles = StyleSheet.create({
   alertDelete:{
     color: '#9B0E0E'
   }
});
export {ModalHeader};
