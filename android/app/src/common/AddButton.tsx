/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextBase, TouchableOpacity, View } from "react-native";


const AddButton: React.FC<{
style? : any
}> = ({style}) => {
    style = style != null ? style : styles;
    return (
        <View style={style.wrapper}>
            <TouchableOpacity
              onPress={() => {console.log('add button pressed!')}}
            >
                <View style={styles.design}>
                    <Text style={styles.text}>+</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    design: {
        justifyContent: 'center',
        fontWeight: 'bold',
        borderWidth: 1,
        borderRadius: 60,
        width: 60,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#3e9ca3',
        borderColor: '#ffffff',
        shadowRadius: 5,
        
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default AddButton;