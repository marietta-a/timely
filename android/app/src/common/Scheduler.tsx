/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import moment from 'moment';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const createTimeSlot = (from: moment.MomentInput, to: moment.MomentInput) => {
    let startTime = moment(from, 'HH:mm');
    let endTime = moment(to, 'HH:mm');
    if (endTime.isBefore(startTime)){
        endTime.add('day', 1);
    }
    const arr = [];
    while (startTime <= endTime){
        arr.push(startTime.format('HH:mm'));
        startTime.add(1, 'hour');
    }
    return arr;
};
const Scheduler = () => {
    const [timeSlots, setTimeSlots] = useState(Array.prototype);

    useState(() => {
        const slot = createTimeSlot('0:00', '23:00');
        setTimeSlots(slot);
    });


    return(
        <SafeAreaView>
            {timeSlots.map(slot=> {
                return (
                    <View key={slot}>
                        <Text>{slot}</Text>
                    </View>
                )
            })}
        </SafeAreaView>
    )

}

export default Scheduler;