/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { modalStyles } from "../assets/styles/ModalDesigner";
import { isNullOrEmpty } from "../core/Functions";

const ColorPaletteModal: React.FC<{
    color?: any
}> = ({color}) => {
    color = isNullOrEmpty(color) ? '#808080' : color;
    const styles = StyleSheet.create({
         paletteWrapper: {
            zIndex: 1,
            justifyContent: 'center',
            fontWeight: 'bold',
            borderWidth: 1,
            borderRadius: 30,
            width: 30,
            height: 30,
            alignItems: 'center',
            backgroundColor: color,
            borderColor: '#ffffff',
            shadowRadius: 5,
            position: 'relative',
         },
         main: {
             flexDirection: 'row',
             width: '70%',
         }
    });

    return(
      <View style={styles.main}>
         <Text style={modalStyles.textInput}>Choose subject color</Text>
          <TouchableOpacity >
              <View style={styles.paletteWrapper}/>
          </TouchableOpacity>
      </View>
    );
};


export default ColorPaletteModal;