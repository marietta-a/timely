/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SubjectCRUD from '../assets/crud/SubjectCRUD';
import { buttonStyles } from '../assets/styles/ButtonDesigner';
import AddButton from '../common/custom/AddButton';
import FormListBuilder from '../common/custom/FormListBuilder';
import { ModalBuilder } from '../common/modal/ModalBuilder';
import SubjectModal from '../modals/SubjectModal';
import { Mark } from '../models/Marks';
import { ModalState } from '../models/ModalState';
import { Subject } from '../models/Subject';

/*const subjects : Subject[] = [
    {
        Id : 1,
        Name: 'Maths',
        Color: '#571d33',
        Teacher: 'p2' ,
    },
    {
        Id: 2,
        Name: 'Computer Science',
        Color: 'red',
        Teacher: 'T3' ,
    },
];*/
const subjects : Subject[] = [];

let subjectColor = '#000000';


const getAllRecords = async() => {

    var record = await SubjectCRUD.getSubjects();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);
    Object.entries(obj).map(item => {
        let subject = Object.setPrototypeOf(item[1], Subject);
        subjects.push(subject);
    });
};

class SubjectPage extends Component{
    constructor(props: any){
        super(props);
        getAllRecords().then(() => this.forceUpdate());
    }

   state: ModalState = {
       modalVisible: false,
   }
    invokeModalClosing(){
        this.setState({modalVisible: false});
        ModalBuilder.modalVisible = this.state.modalVisible;
    }

    emptyItem: Subject = {
        Id: 0,
        Name: '',
        Color: '',
        Teacher: '',
    }

    invokeModal(subject: Subject | undefined){
         ModalBuilder.props =  subject;
         ModalBuilder.modalVisible = true;
         ModalBuilder.deleteVisible = subject !== undefined && subject.Id > 0;
         this.setState({modalVisible: true});
     }
     invokeModalClose(){
          this.setState({modalVisible: false});
      }

     addNewRecord(subject: Subject){
         SubjectCRUD.addSubject(subject).then(() => {subjects.push(subject); this.forceUpdate();});
     }

     updateRecord(subject: Subject){
         SubjectCRUD.updateSubject(subject).then(() => {
             var oldRecord = subjects.find(m => m.Id === subject.Id);
             if (oldRecord){
                 var index = subjects.indexOf(oldRecord);
                 subjects.splice(index, 1, subject);
             }
             this.forceUpdate();
         });
     }
     deleteRecord(id: number){
         SubjectCRUD.deleteSubject(id).then(() => {
             var oldRecord = subjects.find(m => m.Id === id);
             if (oldRecord){
                 var index = subjects.indexOf(oldRecord);
                 subjects.splice(index, 1);
             }
             this.forceUpdate();
         });
     }

    render(){
        SubjectCRUD.createTable();
        ModalBuilder.handleSave = () => {
            let item = Object.assign(new Subject(), ModalBuilder.DATA);
            if (item.Id > 0){
                this.updateRecord(item);
            }
            else {
                this.addNewRecord(item);
            }
        };
        ModalBuilder.handleDelete = () => {
            let item = Object.assign(new Subject(), ModalBuilder.DATA);
            this.deleteRecord(item.Id);
        };
        return (
            <SafeAreaView>
                <FormListBuilder
                ItemList={subjects}
                openModal={(item: Subject | undefined) => this.invokeModal(item)}
                />
                <AddButton
                    style={buttonStyles.buttonAdd}
                    onButtonClicked={this.invokeModal.bind(this, this.emptyItem)}
                />
                <ModalBuilder<Subject>
                 Id={0}
                 Name={''}
                 />
            </SafeAreaView>
        );
    }
}


export default SubjectPage;
