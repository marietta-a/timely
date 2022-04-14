/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ModalBuilder } from "./modal/ModalBuilder";
import { EventModel } from "../models/EventModel";

let color = '#ffffff';

const HeaderElement: React.FC<{
  title: string,
  Element?: Component,
  style?: any,
  textColor?: string,
}> = ({title, Element, style, textColor}) => {
    style = style == null ? styles : style;
    textColor = textColor == null ? color : textColor;
    color = textColor;
    return (
      <View style={styles.mainWrapper}>
        <TouchableOpacity>
          <View>
            <Text style={{color: color}}> Back </Text>
          </View>
        </TouchableOpacity>
        <View style={style.titleWrapper}>
          <Text style={style.titleWrapper}>{title}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    titleWrapper: {
        color: color,
        paddingLeft: 60,
        fontSize: 20,
    },
    mainWrapper: {
       width: '100%',
       backgroundColor: '#3e5ba3',
       height: '18%',
       flexDirection:'row',
       justifyContent: 'flex-start',
       paddingTop: 10,
       paddingLeft: 5
    }
});

export default HeaderElement;
