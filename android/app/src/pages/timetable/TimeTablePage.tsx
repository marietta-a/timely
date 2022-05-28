/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TimetableTemplate from "./TimetableTemplate";
import { WeekDaySlot } from "../../models/DayOfTheWeek";
import { ISchedule, Schedule } from "../../models/Schedule";
import { SLOT_ENDTIME, SLOT_STARTTIME, TIMESLOT_HEIGHT, TIMESLOT_PADDINGLEFT, TIMESLOT_PADDINGTOP, TIMESLOT_WIDTH } from "../../constants/Constants";
import moment from "moment";
import { isNullOrEmpty } from "../../common/Functions";
import ScheduleTemplate from "./ScheduleTemplate";

const TimeTablePage = () => {

    const[schedules, setSchedules] = useState([]);

    const records: ISchedule[] = [
        {
            DayOfTheWeek: 1,
            Id: 1,
            StartTime: "16:00",
            EndTime: "10:45",
            Room: "R1",
            SubjectCode: 1,
            Color: "green",
            SubjectName: "Computer Science"
        },
        {
            DayOfTheWeek: 4,
            Id: 2,
            StartTime: "15:00",
            EndTime: "17:15",
            Room: "R1",
            SubjectCode: 2,
            Color: "blue",
            SubjectName: "Maths"
        },
        {
            DayOfTheWeek: 6,
            Id: 3,
            StartTime: "21:00",
            EndTime: "23:00",
            Room: "R1",
            SubjectCode: 2,
            Color: "brown",
            SubjectName: "Chemistry"
        },
        {
            DayOfTheWeek: 0,
            Id: 4,
            StartTime: "10:00",
            EndTime: "13:00",
            Room: "R6",
            SubjectCode: 2,
            Color: "magenta",
            SubjectName: "Micro controllers"
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
                    startTime={SLOT_STARTTIME}
                    endTime={SLOT_ENDTIME}
                    OnItemSelected={(weekDaySlot: WeekDaySlot) => OnItemSelected(weekDaySlot)}
                />
                <ScheduleTemplate records={records} OnItemSelected={(item: ISchedule) => {console.log(item)}} />
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
