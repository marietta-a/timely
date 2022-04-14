/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
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
        Id: '01',
        EventType: EventTypes.Exam,
        Name: 'Exam',
        Description: 'Math Exam',
    },
];



class EventPage extends Component{
    render(){
        return (
           <SafeAreaView>
               <FormListBuilder ItemList={events} Headers={[]} />
           </SafeAreaView>
        );
    }
}

export default EventPage;
