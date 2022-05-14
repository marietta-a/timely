/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { modalStyles } from '../assets/styles/ModalDesigner';
import SubjectDropdown from '../dropdown/SubjectDropdown';
import { IMark, Mark } from '../models/Marks';
import { ModalState } from '../models/ModalState';
import { Subject } from '../models/Subject';
import { ModalHeader } from './ModalHeader';




const MarkModal:React.FC<{
  modalState: ModalState,
  props?: IMark,
  onRequestClose: any,
  onItemSaved: any,
  onItemDeleted: any,
  deleteVisible: boolean,
}> = ({modalState, props, onRequestClose, onItemSaved, onItemDeleted, deleteVisible}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [subjectDropdownVisible, setSubjectDropdownVisibility] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);
    const [weight, setWeight] = useState(props?.Weight);
    const [markValue, setMarkValue] = useState(props?.Mark);
    const [mark, setMark] = useState(props);
    const [title, setTitle] = useState(props?.Title);
    const [description, setDescription] = useState(props?.Title);
    const [subject, setSubject] = useState(props?.Subject);
    const [subjectName, setSubjectName] = useState(props?.Subject?.Name);

    const reinitializeStates = () => {
      setWeight(undefined);
      setMarkValue(undefined);
      setTitle('');
      setDescription('');
      setMark(new Mark());
      setSubject(new Subject());
      setSubjectName('');
    };

    useEffect(() => {
        setModalVisible(modalState.modalVisible);
        setDeleteVisible(deleteVisible);
        const mk: IMark = {
            Id: props?.Id ?? -1,
            Mark: props?.Mark ?? 0,
            SubjectCode: subject?.Id ?? props?.SubjectCode ?? -1,
            Subject: subject ?? props?.Subject,
            Weight: weight ?? props?.Weight,
            Description: description ?? props?.Description,
            Title: title ?? props?.Title,
        };
        setMark(mk);
    }, [modalState.modalVisible, deleteVisible, props?.Id, props?.Mark,
        props?.SubjectCode, props?.Subject, props?.Weight, props?.Description,
        props?.Title, subject, weight, description, title]);

    const handleDelete = () => {
      onItemDeleted(props?.Id ?? mark?.Id);
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

    const invokeSubjectDropdown = () => {
       console.log("subject pressed");
       setSubjectDropdownVisibility(true);
       console.log(subjectDropdownVisible);
    }

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
                   <Pressable onPress={() => invokeSubjectDropdown()}>
                      <TextInput
                      value={mark?.Subject?.Name}
                      blurOnSubmit={true}
                      style={modalStyles.textInput}
                      onChangeText={(val) => {setSubjectName(val)}}
                      defaultValue={props?.Subject?.Name}
                      autoFocus={true}
                      placeholder="required*"
                      placeholderTextColor="#900C3F"
                      editable={false}
                      />
                      <SubjectDropdown
                      modalState={{modalVisible: subjectDropdownVisible}} 
                      onRequestClose={undefined}/>
                   </Pressable>
               </View>
                <View style={{
                marginLeft: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
                marginRight: 20,
                }}
                >
                    <View style={modalStyles.labelWrapper}>
                        <Text style={modalStyles.textLabel}>Mark</Text>
                        <TextInput
                        value={mark?.Mark?.toString()}
                        blurOnSubmit={true}
                        style={modalStyles.textInput}
                        onChangeText={(val) => setMarkValue(parseInt(val, 10))}
                        defaultValue = {props?.Mark?.toString()}
                        placeholder="required"
                        keyboardType="numeric"
                        />
                    </View>
                    <View style={modalStyles.labelWrapper}>
                        <Text style={modalStyles.textLabel}>Weight</Text>
                        <TextInput
                        value={mark?.Weight?.toString()}
                        blurOnSubmit={true}
                        style={modalStyles.textInput}
                        onChangeText={(val) => setWeight(parseInt(val, 10))}
                        defaultValue = {props?.Weight?.toString()}
                        placeholder="optional"
                        keyboardType="numeric"
                        />
                    </View>
               </View>
                <View style={modalStyles.inputWrapper}>
                    <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Title</Text></View>
                    <TextInput
                    value={mark?.Title}
                    blurOnSubmit={true}
                    style={modalStyles.textInput}
                    onChangeText={(val) => setTitle(val)}
                    defaultValue = {props?.Title}
                    placeholder="optional"
                    />
                </View>
                <View style={modalStyles.inputWrapper}>
                    <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Description</Text></View>
                    <TextInput
                    value={mark?.Description}
                    blurOnSubmit={true}
                    style={modalStyles.textInput}
                    onChangeText={(val) => setDescription(val)}
                    defaultValue = {props?.Description}
                    placeholder="optional"
                    />
                </View>
           </View>
          </Modal>
      </SafeAreaView>
    );
};

export default MarkModal;
