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
import { ModalBuilder } from '../common/modal/ModalBuilder';

const ModalHeader: React.FC<{
  textWrapper?: any,
  textStyle?: any,
  onRequestClose?: any,
}> = ({textWrapper, textStyle, onRequestClose}) => {
    textWrapper = textWrapper == null ? modalStyles.textWrapper : textWrapper;
    textStyle = textStyle == null ? modalStyles.text : textStyle;
    const saveClick = () => {
      onRequestClose();
      Alert.alert( ModalBuilder.DATA + '\nrecord saved');
    };
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
};

export {ModalHeader};
