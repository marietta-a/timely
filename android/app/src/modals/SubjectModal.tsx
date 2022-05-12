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
import { ModalState } from '../models/ModalState';


//const SubjectModal = (props: any) => {

const SubjectModal:React.FC<{
  modalState: ModalState,
}> = ({modalState}) => {
    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');
    const [color, setColor] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
      setRefreshing(false);
    }, []);

    return (
      <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible = {modalState.modalVisible}
            onRequestClose={modalState?.onRequestClose()}
          >
          <View style={styles.mainWrapper}>
            <Pressable
              style={styles.textWrapper}
              onPress={modalState?.onRequestClose()}
            >
                <Text style={styles.text}>X</Text>
            </Pressable>
            <View style={styles.modalView}>
              <TextInput
                value={subject}
                placeholder="Subject name"
                onChangeText={(text) => setSubject(text)}
              />
              <TextInput
                value={teacher}
                placeholder="Teacher's name"
                onChangeText={(txt) => setTeacher(txt)}
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
