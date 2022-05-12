/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useEffect, useState } from 'react';
import { Button, FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SubjectCRUD from '../assets/crud/SubjectCRUD';
import { buttonStyles } from '../assets/styles/ButtonDesigner';
import AddButton from '../common/custom/AddButton';
import { ModalBuilder } from '../common/modal/ModalBuilder';
import SubjectModal from '../modals/SubjectModal';
import { Subject } from '../models/Subject';

const Subjects : Subject[] = [];

let subjectColor = '#000000';


const Item: React.FC<{
    record: Subject
}> = ({record}) => (

    <View style={styles.contentWrapper} key={record.Id}>
        <View style = {{
            height: 50,
            width: 10,
            backgroundColor: record.Color,
        }} />
        <View style={styles.textContainer}>
            <Text style={styles.header}>{record.Name}</Text>
            <Text>{record.Teacher}</Text>
        </View>
    </View>
);

const renderItem: React.FC<{
    item : Subject
 }> = ({item}) => (
     <Item record={item} key={item.Id}/>
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
        Subjects.push(subject);
    });
};

const SubjectPage: React.FC<{
    props?: any
}> = ({props}) => {

   const [modalVisible, setModalVisible] = useState(false);
   const [refreshing, setRefreshing] = useState(false);

   const invokeModal = () => {
        setModalVisible(true);
        ModalBuilder.modalVisible = modalVisible;
    };
    const invokeModalClosing = () => {
        setModalVisible(false);
        ModalBuilder.modalVisible = modalVisible;
    };

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getAllRecords().then(()=>{onRefresh();});
    }, [onRefresh]);

    return (
        <SafeAreaView style={styles.main}>
            <FlatList
            data={Subjects}
            renderItem={renderItem}
            keyExtractor={item => item.Id.toString()}
            />
            <AddButton
                style={buttonStyles.buttonAdd}
                onButtonClicked={() => invokeModal.bind(this)}
            />
            <SubjectModal modalState={{modalVisible: modalVisible, onRequestClose: () => invokeModalClosing.bind(this)}} />
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
