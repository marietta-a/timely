/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createTimeSlot } from "../../common/Functions";
import { TIMESLOTNAME_WIDTH, TIMESLOT_HEIGHT, TIMESLOT_PADDINGLEFT, TIMESLOT_PADDINGTOP, TIMESLOT_WIDTH, WeekDays } from "../../constants/Constants";
import { DayOfTheWeek, WeekDaySlot } from "../../models/DayOfTheWeek";
import { ISchedule } from "../../models/Schedule";

const TimetableTemplate: React.FC<{
   startTime: string,
   endTime: string,
   OnItemSelected: any,
}> = ({startTime, endTime, OnItemSelected}) => {
    const weekDays = WeekDays;
    const timeSlots = createTimeSlot(startTime, endTime);
    let dayIndex = 0;

    const ItemSelected = (day: DayOfTheWeek, slot: string) => {
        const weekDaySlot: WeekDaySlot = {
            DayOfTheWeek: day,
            slot: slot,
        };
        OnItemSelected(weekDaySlot);
    };

    return (
        <View style={styles.rowWrapper}>
            <View style={[styles.slotNameWrapper]}>
                {
                    timeSlots.map(slot => {
                        return(
                            <View key={slot} style={[styles.slotWrapper]}>
                                 <Text style={[styles.slotNameText]}>{slot}</Text>
                            </View>
                        );
                    })
                }
            </View>
            {
                weekDays.map((day) => {
                    dayIndex++;
                    console.log(day);
                    let bgColor = day.SortOrder % 2 !== 0 ? 
                    {backgroundColor: '#ffffff'} :
                    {backgroundColor: '#dddddd'};

                    return (
                        <View key={day.SortOrder} style={[styles.dayWrapper]}>
                            <Text style={[styles.dayTextWrapper]}>{day.ShortName}</Text>
                                {
                                    timeSlots.map(slot => {
                                        return (
                                            <TouchableOpacity key={slot} onPress={() => ItemSelected(day, slot)}>
                                                <View style={[styles.slotWrapper, bgColor]}/>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                        </View>
                    );
                })
            }
        </View>
    );
}


const styles = StyleSheet.create({
    dayWrapper: {
        width: TIMESLOT_WIDTH,
    },
    slotWrapper: {
        height: TIMESLOT_HEIGHT,
        marginBottom: 1,
        borderBottomColor: '#dddddd',
    },
    rowWrapper: {
      flexDirection: 'row',
      width: '100%',
    },
    columnWrapper: {
        flexDirection: 'column',
    },
    slotNameWrapper: {
        paddingTop: TIMESLOT_PADDINGTOP,
        width: TIMESLOTNAME_WIDTH,
    },
    slotNameText: {
        fontSize: 10,
        paddingLeft: TIMESLOT_PADDINGLEFT,
    },
    rowNameRightText: {
        fontSize: 10,
        left: 18,
        width: 80,
    },
    dayTextWrapper: {
        paddingLeft: 10,
        fontSize: 14,
        paddingBottom: 5,
    },
});

export default TimetableTemplate;