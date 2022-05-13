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
import AddButton from '../common/custom/AddButton';
import { isNullOrEmpty } from '../common/Functions';
import { ModalBuilder } from '../common/modal/ModalBuilder';
import SubjectModal from '../modals/SubjectModal';
import { ISubject, Subject } from '../models/Subject';

const subjects: Subject[] = [];

let subjectColor = '#000000';
let emptyState: ISubject ={
    Name: '',
    Id: -1
};
let selectedSubject: Subject = emptyState;

const Item: React.FC<{
    record: Subject,
    openModal?: any
}> = ({record, openModal}) => (

    <TouchableOpacity onPress={openModal(record)} style={styles.contentWrapper} key={record.Id}>
        <View style = {{
            height: 50,
            width: 10,
            backgroundColor: record.Color,
        }} />
        <View style={styles.textContainer}>
            <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: record?.Color ?? '#777'}}>{record.Name}</Text>
            <Text>{record.Teacher}</Text>
        </View>
    </TouchableOpacity>
);

 const wait = (timeout : number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

const getAllRecords = async() => {

    var record = await SubjectCRUD.getSubjects();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);
    Object.entries(obj).map(item => {
        let subject = Object.setPrototypeOf(item[1], Subject);
        subjects.push(subject);
    });
};

const SubjectPage: React.FC<{
    props?: any
}> = ({props}) => {

   SubjectCRUD.createTable();

   const [modalVisible, setModalVisible] = useState(false);
   const [refreshing, setRefreshing] = useState(false);
   const [isDeleteVisible, setDeleteVisible] = useState(false);

   const invokeModal = (subject?: Subject) => {
        setModalVisible(true);
        setDeleteVisible(!isNullOrEmpty(subject?.Name));
        selectedSubject = subject ?? emptyState;
    };
    const invokeModalClosing = () => {
        setModalVisible(false);
        //console.log('closing modal');
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

   const handleSave = (subject: Subject) => {
       console.log('save: ' + subject);
        let item = Object.assign(new Subject(), subject);
        console.log(item);
        if (item.Id > 0 ){
            updateRecord(item);
        }
        else {
            addNewRecord(item);
        }
   }

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
            //console.log('delete: ' + oldRecord);
            if (oldRecord){
                var index = subjects.indexOf(oldRecord);
                subjects.splice(index, 1);
            }
            onRefresh();
        });
    }

    useEffect(() => {
        getAllRecords().then(()=>{onRefresh();});
    }, [onRefresh]);

    const renderItem: React.FC<{
        item : Subject
    }> = ({item}) => (
        <Item record={item} key={item.Id} openModal={()=>invokeModal.bind(this, item)}/>
    );

    return (
        <SafeAreaView style={styles.main}>
            <FlatList
            data={subjects}
            renderItem={renderItem}
            keyExtractor={item => item.Id?.toString() ?? item.Name}
            />
            <AddButton
                style={buttonStyles.buttonAdd}
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
            deleteVisible={true}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create(
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
