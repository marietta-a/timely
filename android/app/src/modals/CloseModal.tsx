/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import {View, Pressable, Text, StyleSheet} from 'react-native';
import { modalStyles } from '../assets/ModalDesigner';

const CloseModal: React.FC<{
  textWrapper?: any,
  textStyle?: any,
  onRequestClose?: any
}> = ({textWrapper, textStyle, onRequestClose}) => {
    textWrapper = textWrapper == null ? modalStyles.textWrapper : textWrapper;
    textStyle = textStyle == null ? modalStyles.text : textStyle;
  return (
      <Pressable style={textWrapper} onPress={onRequestClose}>
        <Text style={textStyle}>X</Text>
      </Pressable>
  );
};

export {CloseModal};
