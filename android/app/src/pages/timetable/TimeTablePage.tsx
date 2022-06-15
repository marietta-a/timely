/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TimetableTemplate from "./TimetableTemplate";
import { WeekDaySlot } from "../../models/DayOfTheWeek";
import { ISchedule, Schedule } from "../../models/Schedule";
import { SLOT_ENDTIME, SLOT_STARTTIME } from "../../constants/Constants";
import ScheduleTemplate from "./ScheduleTemplate";
import ScheduleModal from "../../modals/ScheduleModal";
import ScheduleCRUD from "../../assets/crud/ScheduleCRUD";
import { wait } from "../../common/Functions";


let schedules: ISchedule[] = [];
let emptyState: ISchedule = {
    Id: -1,
    DayOfTheWeek: "0",
    SubjectCode: 0,
    StartTime: '',
};
let selectedSchedule: Schedule = emptyState;

const getAllRecords = async() => {

    let record = await ScheduleCRUD.getSchedules();
    let res = JSON.stringify(record);
    let obj = JSON.parse(res);
    let data = Object.entries(obj).map(item => {
        let schedule = Object.assign(new Schedule(), item[1]);
        return schedule;
    });

    schedules = data;
};

const TimeTablePage = () => {

   ScheduleCRUD.createTable();

    const [schedule, setSchedule] = useState(new Schedule());
    const [modalVisible, setModalVisibility] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isDeleteVisible, setDeleteVisible] = useState(false);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        const ab = new AbortController();
        const signal = ab.signal;
        if(!signal.aborted){
            getAllRecords().then(()=>{onRefresh();});
        }
        return () => ab.abort();
    }, [onRefresh]);

    const OnWeekDaySelected = (weekDaySlot: WeekDaySlot) => {
        selectedSchedule = {
            Id: -1,
            DayOfTheWeek: weekDaySlot?.DayOfTheWeek?.SortOrder,
            StartTime: weekDaySlot?.slot,
            EndTime: '',
            SubjectCode: -1,
            WeekDay: weekDaySlot?.DayOfTheWeek,
            day: weekDaySlot?.DayOfTheWeek?.Day,
        };
        setSchedule(selectedSchedule);
        setModalVisibility(true);
    };
    const handleItemSelected = () => {
        setModalVisibility(false);
    };
    const onScheduleSelected = (item: ISchedule) => {
        setModalVisibility(true);
        setSchedule(item);
    };

   const handleSave = (record: Schedule) => {
        let item = Object.assign(new Schedule(), record);
        console.log('schedule: ' + item);
        if (item.Id > 0 ){
            updateRecord(item);
        }
        else {
            addNewRecord(item);
        }
    };
    const invokeModalClosing = () => {
        setModalVisibility(false);
    };

    function addNewRecord(item: Schedule){
        ScheduleCRUD.addSchedule(item).then(() =>
        {
            schedules.push(item);
            onRefresh();
        });
    }

    function updateRecord(record: Schedule){
        ScheduleCRUD.updateSchedule(record).then(() => {
            var oldRecord = schedules.find(m => m.Id === record.Id);
            if (oldRecord){
                var index = schedules.indexOf(oldRecord);
                schedules.splice(index, 1, record);
            }
            onRefresh();
        });
    }
    const deleteRecord = (id: number) => {
        console.log('deleting ... ' + id);
        ScheduleCRUD.deleteSchedule(id).then(() => {
            var oldRecord = schedules.find(m => m.Id === id);
            if (oldRecord){
                var index = schedules.indexOf(oldRecord);
                schedules.splice(index, 1);
            }
            onRefresh();
        });
    };

    return (
        <SafeAreaView>
           <ScrollView>
               <TimetableTemplate
                    startTime={SLOT_STARTTIME}
                    endTime={SLOT_ENDTIME}
                    OnItemSelected={(weekDaySlot: WeekDaySlot) => OnWeekDaySelected(weekDaySlot)}
                />
                <ScheduleTemplate records={schedules} OnItemSelected={(item: ISchedule) => { onScheduleSelected(item)}} />
                <ScheduleModal
                props={schedule}
                OnItemSelected={() => handleItemSelected()}
                modalVisible={modalVisible}
                onItemSaved={(item: ISchedule) => { handleSave(item)}}
                onItemDeleted={(id: number) => {deleteRecord(id);}}
                deleteVisible={isDeleteVisible}
                onRequestClose={(visible: boolean) => {setModalVisibility(visible); }}/>
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
