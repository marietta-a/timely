/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useState } from "react";
import { Alert, Modal } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";


let subject= "Subject's name";
let teacher = "Teacher's name";

const SubjectModal = (props: any) => {
    return (
      <SafeAreaView style={props.style}>
          <Modal 
            animationType="fade"
            transparent={false}
            visible = {props.modalVisible}
            onRequestClose={() => {
                props.modalVisble = false;
                Alert.alert('modal closing');
            }}
          >
            <TextInput 
              value={subject}
              onChangeText={(value) => {console.log(value);}}
            />
            <TextInput 
              value={teacher}
              onChangeText={(value) => {console.log(value);}}
            />
          </Modal>
      </SafeAreaView>
  );
}
/* class SubjectModal extends Component{
  constructor(props : any){
      super(props);
  }


  state = {
    modalVisible: false,
  };

  setModalVisible = (visible: boolean) => {
      this.setState({modalVisible: visible});
  };
  
   render(){
       console.log("inside student modal")
       const {modalVisible} = this.state;
       return (
          <SafeAreaView>
              <Modal 
                animationType="slide"
                transparent={false}
                visible = {modalVisible}
                onRequestClose={() => {
                    Alert.alert("modal clossing");
                    this.setModalVisible(!modalVisible);
                }}
              />
              <TextInput 
                 value={subject}
                 onChangeText={() => onSubjectChanged}
              />
              <TextInput 
                 value={teacher}
                 onChangeText={() => onTeacherChanged}
              />
          </SafeAreaView>
       );
   };

}
*/
export default SubjectModal;
