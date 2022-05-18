/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import MarkCRUD from "../assets/crud/MarkCRUD";
import SubjectCRUD from "../assets/crud/SubjectCRUD";
import { buttonStyles } from "../assets/styles/ButtonDesigner";
import AddButton from "../custom/AddButton";
import { groupBy, wait } from "../common/Functions";
import MarkModal from "../modals/MarksModal";
import { IMark, IMarkGrouping, Mark } from "../models/Marks";
import { ISubject, Subject } from "../models/Subject";
import { listViewStyles } from "./SubjectPage";
import MarkListView from "../listViews/MarkListView";


const marks: IMark[] = [];
const subjects: ISubject[] = [];
let marksGrouping: IMarkGrouping[] = [];

const getAllMarks = async() => {

    var record = await MarkCRUD.getMarks();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);

    var data = Object.entries(obj).map(item => {
        let mark = Object.assign(new Mark(), item[1]);
        let subject =  subjects.find(b => b.Id === mark.SubjectCode);
        mark.Subject = subject;
        mark.SubjectName = subject?.Name;
        marks.push(mark);
        return mark;
    });

    generateMarkGroupings();
    
    return data;
};

const generateMarkGroupings = () => {
    
    let group = groupBy(marks, 'SubjectName');
    const entries = Object.entries(group);
    const groupings = entries.map(item => {
        const subjectName = item[0];
        let subItemStr = JSON.stringify(item[1]);
        let subItemObj = JSON.parse(subItemStr);
        const itemElements = Object.entries(subItemObj).map(item => {
            return Object.assign(new Mark(), item[1]);
        })
        const grouping: IMarkGrouping ={
            GroupName: subjectName,
            Marks: itemElements
        }
        return grouping;
    });

    marksGrouping = groupings;
}

const getAllSubjects = async() => {
    var record = await SubjectCRUD.getSubjects();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);
    const data = Object.entries(obj).map(item => {
                    let subject = Object.assign(new Subject(), item[1]);
                    subjects.push(subject);
                    return subject;
                });
    return data;
};
const emptyMark : IMark = {
     Id: 0,
     SubjectCode: 1,
     Subject: undefined,
     Mark: 0,
     Title: '',
     Description: '',
     Weight: 0,
 };
 

const  MarkPage:React.FC<{
    props?: any
}> = ({props}) => {
        MarkCRUD.createTable();

        let currentMark: IMark = new Mark();

        const [modalVisible, setModalVisible] = useState(false);
        const [resfreshing, setRefreshing] = useState(false);
        const [isDeleteVisible, setDeleteVisible] = useState(false);

        const onRefresh = React.useCallback(() => {
            setRefreshing(true);
            wait(1000).then(() => setRefreshing(false));
        }, []);

        useEffect(() => {
             getAllSubjects().then(() => getAllMarks().then(() => onRefresh()));
        }, [onRefresh])


        const invokeModal = (mark: Mark | undefined) => {
            setModalVisible(true);
            setDeleteVisible(mark !== undefined && mark?.Id >= 0);
            currentMark = mark ?? new Mark();
        };

        const invokeModalClosing = () => {
             setModalVisible(false);
        };


        const handleSave = (mark: IMark) => {
            let item = Object.assign(new Mark(), mark);
            console.log('handling save ...' + mark);
            if (item.Id > 0 ){
                updateRecord(item);
            }
            else {
                addNewRecord(item);
            }
       };
    
       function addNewRecord(mark: IMark){
            MarkCRUD.addMark(mark).then(() =>
            {
                marks.push(mark);
                generateMarkGroupings();
                onRefresh();
            });
        }
    
        function updateRecord(mark: IMark){
            MarkCRUD.updateMark(mark).then(() => {
                var oldRecord = marks.find(m => m.Id === mark.Id);
                if (oldRecord){
                    var index = marks.indexOf(oldRecord);
                    marks.splice(index, 1, mark);
                }
                generateMarkGroupings();
                onRefresh();
            });
        }
        const deleteRecord = (id: number) => {
            console.log('deleting ... ' + id);
            MarkCRUD.deleteMark(id).then(() => {
                var oldRecord = marks.find(m => m.Id === id);
                if (oldRecord){
                    var index = marks.indexOf(oldRecord);
                    marks.splice(index, 1);
                }
                generateMarkGroupings();
                onRefresh();
            });
        };

        return (
            <SafeAreaView style={listViewStyles.main}>
                <MarkListView openModal={(item: IMark)=> {invokeModal(item)}} records={marksGrouping} />
                <AddButton
                    style={buttonStyles.buttonAdd}
                    onButtonClicked={invokeModal.bind(this, emptyMark)}
                />
                <MarkModal modalState={{modalVisible: modalVisible}}
                props={{
                    Id: currentMark?.Id ?? -1,
                    SubjectCode: currentMark?.SubjectCode ?? -1,
                    Mark: currentMark?.Mark,
                    Description: currentMark?.Description,
                    Title: currentMark?.Title,
                    Subject: currentMark?.Subject,
                }}
                onRequestClose={() => invokeModalClosing()}
                onItemSaved={(item: IMark) => { handleSave(item)}}
                onItemDeleted={(id: number) => {deleteRecord(id);}}
                deleteVisible={isDeleteVisible}
                />

            </SafeAreaView>
        );
};


export default MarkPage;
