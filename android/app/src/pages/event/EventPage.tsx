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
   invokeModal(){
    this.setState({modalVisible: true});
}
    render(){
        return (
           <SafeAreaView>
               <FormListBuilder ItemList={events} />
                <AddButton
                    style={styles.buttonAdd}
                    onButtonClicked={this.invokeModal.bind(this)}
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
        modalWrapper: {
            position: 'relative',
            marginTop: '40%',
            height: '50%',
            width: '50%'
        }
    }
);

export default EventPage;
