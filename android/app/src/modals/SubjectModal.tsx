/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Component } from "react";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


class SubjectModal extends Component{
  state = {
      modalVisible: false,
  };

  setModalVisible = (visible: boolean) => {
      this.setState({modalVisible: visible});
  };
  
   render(){
       return (
          <SafeAreaView>
              <Modal 
                animationType="slide"
              />
          </SafeAreaView>
       );
   };

}

export default SubjectModal;
