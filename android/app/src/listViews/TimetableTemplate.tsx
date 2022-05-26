/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createTimeSlot } from "../common/Functions";
import { TIMESLOT_HEIGHT, WeekDays } from "../constants/Constants";
import { DayOfTheWeek } from "../models/DayOfTheWeek";

const TimetableTemplate: React.FC<{
   startTime: string,
   endTime: string
}> = ({startTime, endTime}) => {
    const weekDays = WeekDays;
    const timeSlots = createTimeSlot(startTime, endTime);
    let dayIndex = 0;

    return(
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
                    dayIndex ++;
                    console.log(day);
                    let bgColor = day.SortOrder % 2 !== 0 ? 
                    {backgroundColor: '#ffffff'} :
                    {backgroundColor: '#dddddd'};

                    return(
                        <View key={day.SortOrder} style={[styles.dayWrapper]}>
                            <Text style={[styles.dayTextWrapper]}>{day.ShortName}</Text>
                                {
                                    timeSlots.map(slot => {
                                        return(
                                            <TouchableOpacity key={slot} onPress={() => {ItemSelected(day, slot)}}>
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

function ItemSelected(day: DayOfTheWeek, slot: string) {
   console.log(day);
   console.log(slot);
}

const styles = StyleSheet.create({
    dayWrapper: {
        width: '13%',
    },
    slotWrapper: {
        height: TIMESLOT_HEIGHT,
        marginBottom: 1,
        borderBottomColor: '#dddddd'
    },
    rowWrapper: {
      flexDirection: 'row',
      width: '100%',
    },
    columnWrapper: {
        flexDirection: 'column',
    },
    slotNameWrapper: {
        paddingTop: 19,
        width: '10%',
    },
    slotNameText: {
        fontSize: 10,
        paddingLeft: 5,
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
    }
});

export default TimetableTemplate;