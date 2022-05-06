/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import MarkCRUD from "../assets/crud/MarkCRUD";
import { buttonStyles } from "../assets/styles/ButtonDesigner";
import AddButton from "../common/custom/AddButton";
import FormListBuilder from "../common/custom/FormListBuilder";
import { ModalBuilder } from "../common/modal/ModalBuilder";
import { Mark } from "../models/Marks";
import { ModalState } from "../models/ModalState";


const marks: Mark[] = [];

const getAllMarks = async() => {

    var record = await MarkCRUD.getMarks();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);
    
    Object.entries(obj).map(item => {
        let mark = Object.setPrototypeOf(item[1], Mark);
        marks.push(mark);
    })
}

export class MarkPage extends Component{
        constructor(props : any){
            super(props);
            getAllMarks().then(() => this.forceUpdate());
        }
        state: ModalState = {
            modalVisible: false,
        };

        emptyMark : Mark ={
            Id: 0,
            SubjectCode: '01',
            Subject: '',
            Mark: 0,
            Title: '',
            Description: '',
            Weight: 0,
        }
        

       invokeModal(mark: Mark | undefined){
            ModalBuilder.props =  mark;
            ModalBuilder.modalVisible = true;
            ModalBuilder.deleteVisible = mark != undefined && mark.Id > 0;
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
                var oldRecord = marks.find(m => m.Id == mark.Id);
                if(oldRecord){
                    var index = marks.indexOf(oldRecord);
                    marks.splice(index, 1, mark);
                }
                this.forceUpdate();
            });
        }
        deleteRecord(id: number){
            MarkCRUD.deleteMark(id).then(() => {
                var oldRecord = marks.find(m => m.Id == id);
                if(oldRecord){
                    var index = marks.indexOf(oldRecord);
                    marks.splice(index, 1);
                }
                this.forceUpdate();
            });
        }
        
        render(){
            MarkCRUD.createTable();
            ModalBuilder.handleSave = () => {
                let mark = Object.assign(new Mark(), ModalBuilder.DATA);
                if(mark.Id > 0){
                    this.updateRecord(mark);
                }
                else{
                    this.addNewRecord(mark);
                }
            };
            ModalBuilder.handleDelete = () => {
                let mark = Object.assign(new Mark(), ModalBuilder.DATA);
                this.deleteRecord(mark.Id);
            }
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
                        Mark={0} Id={0} SubjectCode={""}/>
               </SafeAreaView>
            );
        }
}
