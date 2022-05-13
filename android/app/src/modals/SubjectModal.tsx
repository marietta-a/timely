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

    const [name, setName] = useState(props?.Name);
    const [teacher, setTeacher] = useState(props?.Teacher);
    const defaultColor = props?.Color;
    const [color, setColor] = useState(defaultColor);
    const [modalVisible, setModalVisible] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [subject, setSubject] = useState(new Subject());

    const reinitializeStates = () => {
      setColor('');
      setTeacher('');
      setName('');
      setSubject(new Subject());
    };

    useEffect(() => {
        setModalVisible(modalState.modalVisible);
        setDeleteVisible(deleteVisible);
        let subj: ISubject = {
          Name: !isNullOrEmpty(name) ? name ?? '' : (props?.Name ?? ''),
          Id: props?.Id ?? subject.Id,
          Teacher:!isNullOrEmpty(teacher) ? teacher : props?.Teacher,
          Color: !isNullOrEmpty(color) ? color : props?.Color,
        };
        setSubject(subj);

    }, [modalState.modalVisible, deleteVisible, name, props?.Name, props?.Id, props?.Teacher, props?.Color, subject.Id, teacher, color],);

    const handleDelete = () => {
      onItemDeleted(props?.Id ?? subject.Id);
      reinitializeStates();
    };
    const handleModalClosing = () => {
      onRequestClose();
      reinitializeStates();
    };
    const handleSave = () => {
      onItemSaved(subject);
      reinitializeStates();
    };

    
    return (
      <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={false}
            visible = {modalVisible}
            onRequestClose={handleModalClosing}
          >
          <View style={modalStyles.mainWrapper}>
              <ModalHeader
                  onRequestClose={handleModalClosing}
                  handleSave={handleSave}
                  handleDelete={handleDelete}
                  deleteVisible={deleteVisible}
              />
              <View style={modalStyles.inputWrapper}>
               <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Subject</Text></View>
                   <TextInput
                   value={subject.Name}
                   blurOnSubmit={true}
                   style={modalStyles.textInput}
                   onChangeText={(val) => {setName(val)}}
                   defaultValue={props?.Name}
                   autoFocus={true}
                   placeholder="required*"
                   placeholderTextColor="#900C3F"
                   />
               </View>
                <View style={modalStyles.inputWrapper}>
                <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Color</Text></View>
                <ColorPaletteModal props=
                  {{
                      color:subject?.Color,
                      modalVisible: false,
                      onColorChange: ((col?: string) => {setColor(col ?? defaultColor);}),
                  }}/>
               </View>
                <View style={modalStyles.inputWrapper}>
                <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Teacher</Text></View>
                    <TextInput
                    value={subject?.Teacher}
                    blurOnSubmit={true}
                    style={modalStyles.textInput}
                    onChangeText={(val) => setTeacher(val)}
                    defaultValue = {props?.Teacher}
                    placeholder="optional"
                    />
                </View>
           </View>
          </Modal>
      </SafeAreaView>
    );
};

export default SubjectModal;
