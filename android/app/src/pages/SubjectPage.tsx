/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useEffect, useState } from 'react';
import { Button, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SubjectCRUD from '../assets/crud/SubjectCRUD';
import { buttonStyles } from '../assets/styles/ButtonDesigner';
import AddButton from '../custom/AddButton';
import { isNullOrEmpty, wait } from '../common/Functions';
import { ModalBuilder } from '../modals/ModalBuilder';
import SubjectListView from '../listViews/SubjectListView';
import SubjectModal from '../modals/SubjectModal';
import { ISubject, Subject } from '../models/Subject';

let subjects: ISubject[] = [];

let subjectColor = '#000000';
let emptyState: ISubject = {
    Name: '',
    Id: -1,
};
let selectedSubject: ISubject = emptyState;

const getAllRecords = async() => {
    let record = await SubjectCRUD.getSubjects();
    let res = JSON.stringify(record);
    let obj = JSON.parse(res);
    let data = Object.entries(obj).map(item => {
        let subject = Object.assign(new Subject(), item[1]);
        return subject;
    });

    subjects = data;
};

const SubjectPage: React.FC<{
    props?: any,
    isDropDownList?: boolean,
    onItemSelected?: any,
    buttonSytle?: any,
    modalHeaderVisible?: boolean,
}> = ({props, isDropDownList, onItemSelected, buttonSytle, modalHeaderVisible}) => {

   SubjectCRUD.createTable();

   const [modalVisible, setModalVisible] = useState(false);
   const [refreshing, setRefreshing] = useState(false);
   const [isDeleteVisible, setDeleteVisible] = useState(false);

   const invokeModal = (subject?: ISubject) => {
        setModalVisible(true);
        setDeleteVisible(subject !== undefined && subject?.Id > 0);
        selectedSubject = subject ?? emptyState;
    };
    const invokeModalClosing = () => {
        setModalVisible(false);
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

   const handleSave = (subject: Subject) => {
        let item = Object.assign(new Subject(), subject);
        if (item.Id > 0 ){
            updateRecord(item);
        }
        else {
            addNewRecord(item);
        }
   };

   function addNewRecord(subject: Subject){
        SubjectCRUD.addSubject(subject).then(() =>
        {
            subjects.push(subject);
            onRefresh();
        });
    }

    function updateRecord(subject: Subject){
        SubjectCRUD.updateSubject(subject).then(() => {
            var oldRecord = subjects.find(m => m.Id === subject.Id);
            if (oldRecord){
                var index = subjects.indexOf(oldRecord);
                subjects.splice(index, 1, subject);
            }
            onRefresh();
        });
    }
    const deleteRecord = (id: number) => {
        console.log('deleting ... ' + id);
        SubjectCRUD.deleteSubject(id).then(() => {
            var oldRecord = subjects.find(m => m.Id === id);
            if (oldRecord){
                var index = subjects.indexOf(oldRecord);
                subjects.splice(index, 1);
            }
            onRefresh();
        });
    };

    useEffect(() => {
        const ab = new AbortController();
        const signal = ab.signal;
        if(!signal.aborted){
            getAllRecords().then(()=>{onRefresh();});
        }
        return () => ab.abort();
    }, [onRefresh]);

    return (
        <SafeAreaView style={listViewStyles.main}>
            <SubjectListView
            openModal={(item: ISubject)=> {invokeModal(item)}}
            subjects={subjects}
            onItemSelected={onItemSelected}
            isDropDownList={isDropDownList}
            />

            <AddButton
                style={[buttonStyles.buttonAdd, buttonSytle]}
                onButtonClicked={() => invokeModal()}
            />
            <SubjectModal modalState={{modalVisible: modalVisible }}
            props={{
              Id: selectedSubject.Id,
              Name: selectedSubject.Name,
              Color: selectedSubject?.Color,
              Teacher: selectedSubject?.Teacher,
            }}
            onRequestClose={() => invokeModalClosing()}
            onItemSaved={(item: Subject) => { handleSave(item)}}
            onItemDeleted={(id: number) => {deleteRecord(id);}}
            deleteVisible={isDeleteVisible}
            />
        </SafeAreaView>
    );
};

const listViewStyles = StyleSheet.create(
    {
        container: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 4,
            borderTopWidth: 0.3,
            borderTopColor: subjectColor,

        },
        contentWrapper: {
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'white',
            marginTop: 3,
            borderRadius: 10,
            shadowColor:'black',
            shadowOffset: {
                height: 1,
                width: 5,
            },
            elevation: 6,
        },
        header: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        textContainer: {
            paddingLeft: 4,
        },
        main: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: '100%',
          width: '100%',
        },
        buttonAdd: {
            zIndex: 1,
            position: 'absolute',
            bottom: '15%',
            right: '25%',
        },
        modalWrapper: {
            position: 'relative',
            marginTop: '40%',
            height: '50%',
            width: '50%'
        }
    }
);

export default SubjectPage;
export {listViewStyles};
