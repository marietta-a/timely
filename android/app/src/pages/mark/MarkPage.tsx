/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, useState } from "react";
import { SafeAreaView } from "react-native";
import { buttonStyles } from "../../assets/styles/ButtonDesigner";
import AddButton from "../../common/custom/AddButton";
import FormListBuilder from "../../common/custom/FormListBuilder";
import ItemListBuilder from "../../common/custom/ItemListBuider";
import { ModalBuilder } from "../../common/modal/ModalBuilder";
import { Events } from "../../models/Events";
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


export class MarkPage extends Component{
        constructor(props : any){
            super(props);
        }
        state: ModalState = {
            modalVisible: false,
        };

        emptyMark : Mark ={
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
                    Mark={0}/>
               </SafeAreaView>
            );
        }
}
