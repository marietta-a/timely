/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useEffect, useState } from "react";
import { Option } from "react-dropdown";
import { Alert, SafeAreaView } from "react-native";
import { ItemType } from "react-native-dropdown-picker";
import MarkCRUD from "../assets/crud/MarkCRUD";
import SubjectCRUD from "../assets/crud/SubjectCRUD";
import { buttonStyles } from "../assets/styles/ButtonDesigner";
import AddButton from "../custom/AddButton";
import FormListBuilder from "../custom/FormListBuilder";
import { defaultHiddenFields } from "../common/Functions";
import { ModalBuilder } from "../modals/ModalBuilder";
import { DataType } from "../common/model/DataType";
import { DropdownItemModel } from "../common/model/DropdownItemModel";
import { Mark } from "../models/Marks";
import { ModalState } from "../models/ModalState";
import { Subject } from "../models/Subject";


const marks: Mark[] = [];
const subjectLookups: Option[] = [];

const getAllMarks = async() => {

    var record = await MarkCRUD.getMarks();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);
    let i = 0;
    Object.entries(obj).map(item => {
        --i;
        let mark = Object.setPrototypeOf(item[1], Mark);
        let subjectCode = parseInt(mark.SubjectCode, 10);
        let subject =  subjectLookups.find(s => s.label === subjectCode);
        mark.Subject = subject?.value;
        marks.push(mark);
    });
};

const getAllSubjects = async() => {
    var record = await SubjectCRUD.getSubjects();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);
    Object.entries(obj).map(item => {
        let subject = Object.setPrototypeOf(item[1], Subject);
        let lookup: Option = {
            value: subject?.Name,
            label: subject.Id,
            className: 'Subject',
            data: subject?.Name
        };
        subjectLookups.push(lookup);
    });
};

export class MarkPage extends Component{
        constructor(props : any){
            super(props);
            getAllSubjects().then(() => getAllMarks().then(() => this.forceUpdate()));
            //getAllMarks().then(() => this.forceUpdate());
        }
        state: ModalState = {
            modalVisible: false,
        };

        emptyMark : Mark ={
            Id: 0,
            SubjectCode: 1,
            Subject: '',
            Mark: 0,
            Title: '',
            Description: '',
            Weight: 0,
        }

       invokeModal(mark: Mark | undefined){
            ModalBuilder.props =  mark;
            ModalBuilder.modalVisible = true;
            ModalBuilder.deleteVisible = mark !== undefined && mark.Id > 0;
            this.setState({modalVisible: true});
        }
        invokeModalClose(){
             this.setState({modalVisible: false});
         }

        addNewRecord(mark: Mark){
            MarkCRUD.addMark(mark).then(() => {marks.push(mark); this.forceUpdate();});
        }

        updateRecord(mark: Mark){
            MarkCRUD.updateMark(mark).then(() => {
                var oldRecord = marks.find(m => m.Id === mark.Id);
                if (oldRecord){
                    var index = marks.indexOf(oldRecord);
                    marks.splice(index, 1, mark);
                }
                this.forceUpdate();
            });
        }
        deleteRecord(id: number){
            MarkCRUD.deleteMark(id).then(() => {
                var oldRecord = marks.find(m => m.Id === id);
                if (oldRecord){
                    var index = marks.indexOf(oldRecord);
                    marks.splice(index, 1);
                }
                this.forceUpdate();
            });
        }

        getDropdownItems(){
            const lookupItems: DropdownItemModel = {
                Name: 'Subject',
                Items: subjectLookups,
            };
            const dropdownItems: DropdownItemModel[] = [];
            dropdownItems.push(lookupItems);
            ModalBuilder.dropdownItems = dropdownItems;
        }

        render(){
            MarkCRUD.createTable();

            this.getDropdownItems();
            ModalBuilder.handleSave = () => {
                let mark = Object.assign(new Mark(), ModalBuilder.DATA);
                if (mark.Id > 0){
                    this.updateRecord(mark);
                }
                else {
                    this.addNewRecord(mark);
                }
            };
            ModalBuilder.handleDelete = () => {
                let mark = Object.assign(new Mark(), ModalBuilder.DATA);
                this.deleteRecord(mark.Id);
            };

            return (
               <SafeAreaView>
                   <FormListBuilder
                   ItemList={marks}
                   openModal={(item: Mark | undefined) => this.invokeModal(item)}
                   />
                    <AddButton
                        style={buttonStyles.buttonAdd}
                        onButtonClicked={this.invokeModal.bind(this, this.emptyMark)}
                    />
                    <ModalBuilder<Mark>
                        Subject={''}
                        Mark={0} Id={0} SubjectCode={1}/>
               </SafeAreaView>
            );
        }
}
