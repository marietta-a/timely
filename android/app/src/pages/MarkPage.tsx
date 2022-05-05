/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useState } from "react";
import { SafeAreaView } from "react-native";
import MarkCRUD from "../assets/crud/MarkCRUD";
import { buttonStyles } from "../assets/styles/ButtonDesigner";
import AddButton from "../common/custom/AddButton";
import FormListBuilder from "../common/custom/FormListBuilder";
import ItemListBuilder from "../common/custom/ItemListBuider";
import { ModalBuilder } from "../common/modal/ModalBuilder";
import { getMarks } from "../effects/MarkEffect";
import { Events } from "../models/Events";
import { Mark } from "../models/Marks";
import { ModalState } from "../models/ModalState";


const marks: Mark[] = [
    {
        Id: 1,
        Subject: 'Maths',
        SubjectCode: '01',
        Mark: 60,
        Description: 'Maths Test',
    },
    {
        Id: 2,
        Subject: 'English',
        SubjectCode: '02',
        Mark: 60,
        Description: 'English Test',
    },
    {
        Id: 3,
        Subject: 'French',
        SubjectCode: '03',
        Mark: 60,
        Description: 'French Test',
    },
    {
        Id: 4,
        Subject: 'Computer Science',
        SubjectCode: '04',
        Mark: 60,
        Description: 'Computer Science Test',
    },
];

const allMarks = getMarks();
console.log('Marks from effects: '+ allMarks);

export class MarkPage extends Component{
        constructor(props : any){
            super(props);
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
            this.setState({modalVisible: true});
        }
        invokeModalClose(){
             this.setState({modalVisible: false});
         }
         
        render(){
            MarkCRUD.createTable();
            ModalBuilder.handleSave = () => {
                let mark = Object.assign(new Mark(), ModalBuilder.DATA);
                MarkCRUD.addMark(mark);
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
                        Mark={0} Id={0} SubjectCode={""}/>
               </SafeAreaView>
            );
        }
}
