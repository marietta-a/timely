/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import { buttonAddStyle, buttonStyles } from "../../assets/ButtonDesigner";
import AddButton from "../../common/custom/AddButton";
import FormListBuilder from "../../common/custom/FormListBuilder";
import { ModalBuilder } from "../../common/modal/ModalBuilder";
import { EventModel } from "../../models/EventModel";
import { Mark } from "../../models/Marks";
import { ModalState } from "../../models/ModalState";


const marks: Mark[] = [
    {
        Subject: 'Maths',
        Mark: 60,
        Description: 'Maths Test',
    },
    {
        Subject: 'English',
        Mark: 60,
        Description: 'English Test',
    },
    {
        Subject: 'French',
        Mark: 60,
        Description: 'French Test',
    },
    {
        Subject: 'Computer Science',
        Mark: 60,
        Description: 'Computer Science Test',
    },
];

var currentMark:Mark | null = {
    Subject: '',
    Mark: 0,
};

export class MarkPage extends Component{
        constructor(props : any){
            super(props);
        }
        state : ModalState = {
            modalVisible: false,
        };
       invokeModal(mark: Mark | null){
            this.setState({modalVisible: true});
            ModalBuilder.modalVisible = true;
            currentMark = mark;
        }
        invokeModalClose(){
             this.setState({modalVisible: false});
         }
        render(){
            return (
               <SafeAreaView>
                   <FormListBuilder ItemList={marks} openModal={this.invokeModal.bind(this)} />
                    <AddButton
                        style={buttonStyles.buttonAdd}
                        onButtonClicked={this.invokeModal.bind(this)}
                    />
                    <ModalBuilder<Mark>
                    Subject={currentMark?.Subject ?? ''}
                    Mark={currentMark?.Mark ?? 0}/>
               </SafeAreaView>
            );
        }
}
