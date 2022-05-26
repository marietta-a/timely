/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TimetableTemplate from "../../listViews/TimetableTemplate";
import { WeekDaySlot } from "../../models/DayOfTheWeek";
import { ISchedule, Schedule } from "../../models/Schedule";

const TimeTablePage = () => {

    const[schedules, setSchedules] = useState([]);

    const records: ISchedule[] = [
        {
            DayOfTheWeek: 1,
            Id: 1,
            StartTime: "13:00",
            EndTime: "14:45",
            Room: "R1",
            SubjectCode: 1,
            Color: "green",
        },
        {
            DayOfTheWeek: 4,
            Id: 2,
            StartTime: "8:00",
            EndTime: "10:15",
            Room: "R1",
            SubjectCode: 2,
            Color: "blue",
        }
    ]
    
    useEffect(() => {
    },[]);
    
    const OnItemSelected = (weekDaySlot: WeekDaySlot) => {
        console.log('record: ' + weekDaySlot.DayOfTheWeek.Day);
    }

    return(
        <SafeAreaView>
           <ScrollView>
               <TimetableTemplate
                    startTime={"5:00"}
                    endTime={"23:00"}
                    OnItemSelected={(weekDaySlot: WeekDaySlot) => OnItemSelected(weekDaySlot)} 
                    records={records}               />
           </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});

export default TimeTablePage;
