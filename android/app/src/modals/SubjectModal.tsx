/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useState, useEffect } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubjectCRUD from '../assets/crud/SubjectCRUD';
import { modalStyles } from '../assets/styles/ModalDesigner';
import { isNullOrEmpty } from '../common/Functions';
import { ModalBuilder } from '../common/modal/ModalBuilder';
import { ModalState } from '../models/ModalState';
import { ISubject, Subject } from '../models/Subject';
import ColorPaletteModal from './ColorPaletteModal';
import { ModalHeader } from './ModalHeader';




const SubjectModal:React.FC<{
  modalState: ModalState,
  props?: Subject,
  onRequestClose: any,
  onItemSaved: any,
  onItemDeleted: any,
  deleteVisible: boolean,
}> = ({modalState, props, onRequestClose, onItemSaved, onItemDeleted, deleteVisible}) => {

    const [name, setName] = useState(props?.Name ?? '');
    const [teacher, setTeacher] = useState(props?.Teacher);
    const defaultColor = props?.Color ?? '#aaaaaa';
    const [color, setColor] = useState(defaultColor);
    const [modalVisible, setModalVisible] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [subject, setSubject] = useState(new Subject());

    useEffect(() => {
        setModalVisible(modalState.modalVisible);
        setDeleteVisible(deleteVisible);
        let subj: ISubject = {
          Name: name,
          Id: subject.Id,
          Teacher: teacher,
          Color: color
        };
        setSubject(subj);
    })


    return (
      <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={false}
            visible = {modalVisible}
            onRequestClose={onRequestClose}
          >
          <View style={modalStyles.mainWrapper}>
              <ModalHeader 
                  onRequestClose={onRequestClose} 
                  handleSave={onItemSaved(subject)}
                  handleDelete={onItemDeleted(subject.Id)}
                  deleteVisible={deleteVisible}
              />
              <View style={modalStyles.inputWrapper}>
               <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Subject</Text></View>
                   <TextInput
                   value={name}
                   blurOnSubmit={true}
                   style={modalStyles.textInput}
                   onChangeText={(val) => setName(val)}
                   defaultValue={props?.Name}
                   autoFocus={true}
                   />
               </View>
                <View style={modalStyles.inputWrapper}>
                <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Color</Text></View>
                <ColorPaletteModal props=
                  {{
                      color:color, 
                      modalVisible: false,
                      onColorChange: ((col?: string) => {setColor(col ?? defaultColor);}),
                  }}/>
               </View>
                <View style={modalStyles.inputWrapper}>
                <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Teacher</Text></View>
                    <TextInput
                    value={teacher}
                    blurOnSubmit={true}
                    style={modalStyles.textInput}
                    onChangeText={(val) => setTeacher(val)}
                    defaultValue = {props?.Teacher ?? 'optional'}
                    />
                </View>
              
           </View>
              
          </Modal>
      </SafeAreaView>
    );
};



const styles = StyleSheet.create({
   mainWrapper: {
    margin: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 10,
   },
   modalView:{
     height: 200,
     alignItems: 'center',
     borderRadius: 20,
   },
   textWrapper:{
     alignItems: 'flex-end',
     paddingRight: 20,
     paddingTop: 10,
   },
   text: {
     fontWeight: 'bold',
     fontSize: 24,
   },
});

export default SubjectModal;
