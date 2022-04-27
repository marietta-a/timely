/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddButton from '../../common/custom/AddButton';
import FormListBuilder from '../../common/custom/FormListBuilder';
import { ModalBuilder } from '../../common/modal/ModalBuilder';
import { EventTypes } from '../../core/Enums';
import { EventModel } from '../../models/EventModel';
import { ModalState } from '../../models/ModalState';

const events: EventModel[] = [
    {
        Id: '01',
        EventType: EventTypes.Assignment,
        Name: 'Assignment',
    },
    {
        Id: '02',
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

   invokeModal(){
        this.setState({modalVisible: true});
        ModalBuilder.modalVisible = true;
    }
    invokeModalClose(){
         this.setState({modalVisible: false});
     }
    render(){
        return (
           <SafeAreaView>
               <FormListBuilder ItemList={events} openModal={this.invokeModal.bind(this)}/>
                <AddButton
                    style={styles.buttonAdd}
                    onButtonClicked={this.invokeModal.bind(this)}
                />
                <ModalBuilder<EventModel>
                 Id={''} Name={''}
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
