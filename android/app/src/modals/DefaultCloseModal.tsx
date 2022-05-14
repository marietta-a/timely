/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { Pressable, Text } from "react-native";
import { modalStyles } from "../assets/styles/ModalDesigner";

const DefaultCloseModal: React.FC<{
    onVisibilityChange: any
}> = ({onVisibilityChange}) => {
    return (
        <Pressable onPress={onVisibilityChange.bind(this)}>
         <Text style={modalStyles.text}>X</Text>
        </Pressable>
    );
};

export default DefaultCloseModal;
