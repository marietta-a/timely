/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import moment from 'moment';
import React from "react"
import { Pressable, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { isNullOrEmpty } from "../../common/Functions"
import { SLOT_STARTTIME, TIMESLOT_WIDTH, TIMESLOT_PADDINGLEFT, TIMESLOT_HEIGHT, TIMESLOT_PADDINGTOP } from "../../constants/Constants"
import { ISchedule } from "../../models/Schedule"

const ScheduleTemplate: React.FC<{
    records : ISchedule[],
    OnItemSelected: any,
}> = ({records, OnItemSelected}) => {
 
    const ItemSelected = (item: ISchedule) => {
         OnItemSelected(item);
    }
    return (
        <SafeAreaView style={{position: 'absolute'}}>
            {
                    records.map(record => {
                        const defaultStartTime = moment(SLOT_STARTTIME, 'HH: mm');
                        const startTime = moment(record.StartTime, 'HH:mm');
                        const endTime = !isNullOrEmpty(record?.EndTime) ? moment(record.EndTime, 'HH:mm'): startTime.add(10, 'minute');
                        const startHour = startTime.hour();
                        const startMinute = startTime.minute();
                        const endHour = endTime.hour();
                        const endMinute = endTime.minute();
                        const startDiff = startHour - defaultStartTime.hour();
                        const endDiff = endHour - defaultStartTime.hour();

                        const left = (TIMESLOT_WIDTH * (record.DayOfTheWeek + 1)) - (TIMESLOT_PADDINGLEFT * 2);
                        const top = ((startDiff) * TIMESLOT_HEIGHT) + TIMESLOT_PADDINGTOP + (startMinute/60 * TIMESLOT_HEIGHT) + 5 + startDiff;
                        const topEnd = ((endDiff) * TIMESLOT_HEIGHT) + TIMESLOT_PADDINGTOP + (endMinute/60 * TIMESLOT_HEIGHT) + 5 + endDiff;
                        const slotHeight = topEnd - top;
                        return (
                            <Pressable key={record.Id} onPress={() => ItemSelected(record)} style={{
                                top: top,
                                left: left,
                                position: 'absolute',
                                backgroundColor: record.Color,
                                borderRadius: 5,
                                width: TIMESLOT_WIDTH - 5,
                                height: slotHeight,
                                opacity: 0.6,
                                shadowOpacity: 0.7,
                                shadowRadius: 9,
                                shadowColor: 'white',
                                shadowOffset: {
                                width: 2,
                                height: 1,
                                },
                                elevation: 4,
                            }}>
                              <TouchableOpacity>
                                <Text style={{color: '#000', fontSize: 14}}>{record.SubjectName}</Text>
                                <Text style={{color: '#000', fontSize: 12}}>{record.Room}</Text>
                              </TouchableOpacity>
                            </Pressable>
                        );
                    })
                }
        </SafeAreaView>
    );
};

export default ScheduleTemplate;
