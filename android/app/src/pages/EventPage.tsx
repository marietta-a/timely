/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventCRUD from '../assets/crud/EventCRUD';
import AddButton from '../custom/AddButton';
import FormListBuilder from '../custom/FormListBuilder';
import { ModalBuilder } from '../modals/ModalBuilder';
import { EventTypes } from '../core/Enums';
import { Events } from '../models/Events';
import { ModalState } from '../models/ModalState';
import SQLite from 'react-native-sqlite-storage';
import { defaultHiddenFields } from '../common/Functions';

const events: Events[] = [
    {
        Id: 1,
        EventType: EventTypes.Assignment,
        Name: 'Assignment',
    },
    {
        Id: 2,
        EventType: EventTypes.Exam,
        Name: 'Exam',
        Description: 'Math Exam',
    },
];



class EventPage extends Component{
    constructor(props : any){
        super(props);
    }
    state : ModalState = {
        modalVisible: false,
    };
    emptyEvent: Events ={
        Id: 0,
        Name: '',
        EventType: 0,
        Description: '',
        Subject: '',
    }

   invokeModal(event : Events | undefined){
        ModalBuilder.props = event;
        ModalBuilder.modalVisible = true;
        this.setState({modalVisible: true});
    }
    invokeModalClose(){
         this.setState({modalVisible: false});
     }
    render(){
        SQLite.enablePromise(true);
        EventCRUD.createTable();
        return (
           <SafeAreaView>
               <FormListBuilder
               ItemList={events}
               hiddenFields={defaultHiddenFields}
               openModal={(item: Events | undefined) => this.invokeModal(item)}/>
                <AddButton
                    style={styles.buttonAdd}
                    onButtonClicked={this.invokeModal.bind(this, this.emptyEvent)}
                />
                <ModalBuilder<Events>
                 Id={0} Name={''}
                 EventType={0}
                />
           </SafeAreaView>
        );
    }
}


const styles = StyleSheet.create(
    {
        header: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        textContainer: {
            paddingLeft: 4,
        },
        main: {
          height: '100%',
          width: '100%',
        },
        buttonAdd: {
            zIndex: 1,
            position: 'absolute',
            bottom: '15%',
            right: '25%',
        },
    }
);

export default EventPage;
