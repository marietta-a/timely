/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react"
import { Text, View } from "react-native";
import AddButton from "./AddButton";

const FooterElement: React.FC<{
    Element?: View
}> = ({Element}) => {
  return (
      <View>
        <AddButton />
      </View>
  );
};

export default FooterElement;