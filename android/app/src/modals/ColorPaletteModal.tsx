/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { modalStyles } from "../assets/styles/ModalDesigner";
import ColorPalette from 'react-native-color-palette'
import ColorPaletteModel from "../common/ColorPaletteModel";
import { useState } from "react";
import { useEffect } from "react";

const ColorPaletteModal: React.FC<{
    props?: ColorPaletteModel
}> = ({props}) => {
 const defaultColor = props?.color ? props.color : '#aaaaaa';
 const [color, onChangeColor] = useState(defaultColor);
 const [visible, onVisibilityChange] = useState(false);

  const   styles = StyleSheet.create({
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
             width: '85%',
        },
        palette: {
            width: '80%',
            height: '50%',
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '10%',
            marginTop: '20%',
            elevation: 4,
            shadowColor: props?.color,
        }
    });

    function onColorChange(col?: string){
        onChangeColor(col);
        onVisibilityChange(false);
        console.log(col);
        props?.onColorChange(col);
    }
    return (
        <View style={styles.main}>
            <Text style={modalStyles.textInput}>choose subject color (optional)</Text>
            <Pressable 
                onPress={() => {onVisibilityChange(true)}}>
                <View style={styles.paletteWrapper}/>
            </Pressable>
            <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={() => onVisibilityChange(false)}
            transparent={true}
            >
            <View style={styles.palette}>
                <Pressable onPress={() => onVisibilityChange(false)}>
                        <Text style={modalStyles.text}>X</Text>
                </Pressable>
                <ColorPalette 
                    onChange={(col?: string ) => onColorChange(col)}
                />
            </View>
            </Modal>
        </View>
    );
}

export default ColorPaletteModal;

