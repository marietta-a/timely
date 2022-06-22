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
import { SLOT_ENDTIME, SLOT_STARTTIME, WeekDays } from "../../constants/Constants";
import ScheduleTemplate from "./ScheduleTemplate";
import ScheduleModal from "../../modals/ScheduleModal";
import ScheduleCRUD from "../../assets/crud/ScheduleCRUD";
import { wait } from "../../common/Functions";
import { ISubject, Subject } from "../../models/Subject";
import SubjectCRUD from "../../assets/crud/SubjectCRUD";


const subjects: ISubject[] = [];
const schedules: ISchedule[] = [];
let emptyState: ISchedule = {
    Id: -1,
    DayOfTheWeek: 0,
    SubjectCode: 0,
    StartTime: '',
};
let selectedSchedule: Schedule = emptyState;

const DATA: ISchedule[] = [
    {
        Id: -11,
        DayOfTheWeek: 2,
        StartTime: '10:00',
        SubjectCode: 2,
        Color: 'red',
        SubjectName: 'Computer Science',
        EndTime: '13:15',
        Room: 'p4'
    }
]

const getAllRecords = async() => {
    let record = await ScheduleCRUD.getSchedules();
    let res = JSON.stringify(record);
    let obj = JSON.parse(res);
    let data = Object.entries(obj).map(item => {
        let schedule = Object.assign(new Schedule(), item[1]);
        let subject =  subjects.find(b => b.Id == schedule.SubjectCode || b.Id === schedule.SubjectCode);
        let weekDay = WeekDays.find(w => w.SortOrder == schedule.DayOfTheWeek || w.SortOrder === schedule.DayOfTheWeek);
        schedule.Subject = subject;
        schedule.WeekDay = weekDay;
        schedule.SubjectName = subject?.Name;
        schedule.Color = subject?.Color;
        schedules.push(schedule);
        return schedule;
    });
};

const getAllSubjects = async() => {
    var record = await SubjectCRUD.getSubjects();
    var res = JSON.stringify(record);
    var obj = JSON.parse(res);
    const data = Object.entries(obj).map(item => {
                    let subject = Object.assign(new Subject(), item[1]);
                    subjects.push(subject);
                    return subject;
                });
    return data;
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
        getAllSubjects().then(() => getAllRecords().then(() => onRefresh()));
    }, [onRefresh]);

    const OnWeekDaySelected = (weekDaySlot: WeekDaySlot) => {
        selectedSchedule.WeekDay = weekDaySlot?.DayOfTheWeek;
        selectedSchedule.day = weekDaySlot?.DayOfTheWeek?.Day;
        selectedSchedule.DayOfTheWeek = weekDaySlot?.DayOfTheWeek?.SortOrder;
        selectedSchedule.StartTime = weekDaySlot.slot;
        setSchedule(selectedSchedule);
        setModalVisibility(true);
    };
    const handleItemSelected = () => {
        setModalVisibility(false);
    };
    const onScheduleSelected = (item: ISchedule) => {
        setDeleteVisible(item.Id > 0);
        setModalVisibility(true);
        setSchedule(item);
    };

   const handleSave = (record: Schedule) => {
        let item = Object.assign(new Schedule(), record);
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
        console.log('adding ...');
        ScheduleCRUD.addSchedule(item).then(() =>
        {
            let subject =  subjects.find(b => b.Id == item.SubjectCode || b.Id === item.SubjectCode);
            let weekDay = WeekDays.find(w => w.SortOrder == item.DayOfTheWeek || w.SortOrder === item.DayOfTheWeek);

            item.Subject = subject;
            item.WeekDay = weekDay;
            
            console.log(JSON.stringify(item));

            schedules.push(item);
            onRefresh();
        });
    }

    function updateRecord(record: Schedule){
        console.log('updating ...');
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
                <ScheduleTemplate records={schedules} OnItemSelected={(item: ISchedule) => { onScheduleSelected(item); } } />
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
