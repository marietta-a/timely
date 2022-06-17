/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { modalStyles, requiredFieldColor } from "../assets/styles/ModalDesigner";
import { isNullOrEmpty } from "../common/Functions";
import SubjectDropdown from "../dropdown/SubjectDropdown";
import WeekDaysDropDown from "../dropdown/WeekDaysDropDown";
import { DayOfTheWeek } from "../models/DayOfTheWeek";
import { ISchedule, Schedule } from "../models/Schedule";
import { ISubject, Subject } from "../models/Subject";
import { ModalHeader } from "./ModalHeader";
import DatePicker from "react-native-date-picker";

const ScheduleModal: React.FC<{
props: Schedule,
OnItemSelected: any,
modalVisible: boolean,
onRequestClose?: any,
onItemSaved: any,
onItemDeleted: any,
deleteVisible: boolean,
}> = ({props, OnItemSelected, modalVisible, onRequestClose, onItemSaved, onItemDeleted, deleteVisible}) => {
    const day: DayOfTheWeek = {
        Day: "",
        ShortName: "",
        SortOrder: 0
    };
    const date = new Date().toDateString();
    const [weekDay, setWeekDay] = useState(props?.WeekDay ?? day);
    const [weekDayVisible, setWeekDayVisible] = useState(false);
    const [schedule, setSchedule] = useState(props);
    const [subject, setSubject] = useState(new Subject());
    const [startTime, setStartTime] = useState(new Date());
    const [openStart, setOpenStart] = useState(false);
    const [endTime, setEndTime] = useState(new Date());
    const [openEnd, setOpenEnd] = useState(false);
    const [subjectVisible, setSubjectVisibility] = useState(false);
    const [subjectName, setSubjectName] = useState('');
    const [dayName, setDayName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        //setDeleteVisible(deleteVisible);
        let sched: Schedule = {
            Id: schedule?.Id ?? props.Id,
            DayOfTheWeek:  !isNullOrEmpty(weekDay?.SortOrder) ? weekDay?.SortOrder  : (props?.WeekDay?.SortOrder ?? -1),
            SubjectCode: subject?.Id > 0 ? subject.Id : props.SubjectCode,
            StartTime:  startTime.toLocaleTimeString('en-US'),
            EndTime: endTime.toLocaleTimeString('en-US'),
            WeekDay: weekDay ?? props?.WeekDay,
            SubjectName: subject?.Name ?? props?.SubjectName,
            Room: room ?? props?.Room,
        };
        setSchedule(sched);
    }, [schedule?.Id, props.Id, props?.WeekDay?.SortOrder, props?.SubjectCode, weekDay?.SortOrder, subject.Id, startTime, endTime, props?.WeekDay, weekDay, props?.SubjectName, subjectName, props?.Room, room, subject?.Name]);


    const invokeWeekDayDropdown = () => {
        setWeekDayVisible(true);
    };
    const handleWeedDaySelected = (item: DayOfTheWeek) => {
        setWeekDay(item);
        setWeekDayVisible(false);
    };
    const invokeSubjectDropdown = () => {
        setSubjectVisibility(true);
        console.log('invoke subject modal: ' + subjectVisible);
    };
    const handleSubjectSelected = (item: ISubject) => {
        setSubject(item);
        setSubjectVisibility(false);
    };
    const handleModalClosing = () => {
        console.log('closing schedule modal');
        onRequestClose(false);
    };
    const handleSubjectModalClosing = () => {
        setSubjectVisibility(false);
    };

    const handleSave = () => {
        onItemSaved(schedule);
       // reinitializeStates();
    };

    const handleDelete = () => {
        onItemDeleted(props?.Id ?? schedule.Id);
       // reinitializeStates();
    };

    const subjectWrapper = {
          fontSize: 18,
          borderBottomWidth: 2,
          width: '98%',
          borderBottomColor: '#555555',
          paddingBottom: 0,
          color: subject?.Color,
        };

    return (
        <SafeAreaView>
            <Modal
             animationType="slide"
             transparent={false}
             visible={modalVisible}
            >
                <View style={[modalStyles.mainWrapper]}>
                    <ModalHeader
                    deleteVisible={deleteVisible}
                    onRequestClose={() => handleModalClosing()}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    />
                    <View style={modalStyles.inputWrapper}>
                    <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Day of the week</Text></View>
                        <Pressable onPress={() => invokeWeekDayDropdown()} >
                            <TextInput
                            value={schedule?.WeekDay?.Day}
                            blurOnSubmit={true}
                            style={modalStyles.textInput}
                            onChangeText={(val) => {setDayName(val)}}
                            defaultValue={props?.WeekDay?.Day}
                            autoFocus={true}
                            placeholder="required*"
                            placeholderTextColor= {requiredFieldColor}
                            editable={false}
                            />
                            <WeekDaysDropDown
                            visible={weekDayVisible}
                            onItemSelected={(item: DayOfTheWeek) => handleWeedDaySelected(item)}
                            style={[styles.modalWrapper]}
                            />
                        </Pressable>
                    </View>

                    <View style={modalStyles.inputWrapper}>
                        <View style={modalStyles.labelWrapper}>
                            <Text style={modalStyles.textLabel}>Subject</Text>
                        </View>
                        <Pressable onPress={() => invokeSubjectDropdown()} >
                            <TextInput
                                value={schedule?.SubjectName}
                                blurOnSubmit={true}
                                style={[modalStyles.textInput, subjectWrapper]}
                                onChangeText={(val) => {setSubjectName(val)}}
                                defaultValue={props?.SubjectName}
                                autoFocus={true}
                                placeholder="required*"
                                placeholderTextColor= {requiredFieldColor}
                                editable={false}
                            />
                            <SubjectDropdown
                                modalState={{ modalVisible: subjectVisible }}
                                onRequestClose={() => handleSubjectModalClosing() }
                                onItemSelected={(item: ISubject) => handleSubjectSelected(item)}
                                style={styles.subjectModalWrapper}
                                modalHeaderVisible={false}
                            />
                        </Pressable>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={modalStyles.inputWrapper}>
                            <View style={modalStyles.labelWrapper}>
                                <Text style={modalStyles.textLabel}>Start Time</Text>
                            </View>
                            <View>
                                <Pressable onPress={() => {}} >
                                    <TextInput
                                        value={schedule?.StartTime}
                                        blurOnSubmit={true}
                                        style={[modalStyles.textInput]}
                                        //onChangeText={(val) => {setStartTime(val)}}
                                        defaultValue={props?.StartTime}
                                        autoFocus={true}
                                        placeholder="required*"
                                        placeholderTextColor= {requiredFieldColor}
                                        onPressIn={() => {setOpenStart(true);}}
                                    />
                                    <DatePicker
                                        modal
                                        mode="time"
                                        open={openStart}
                                        date={startTime}
                                        onConfirm={(val) => {
                                            console.log(val.toLocaleTimeString('en-US'));
                                            setOpenStart(false);
                                            setStartTime(val);
                                        }}
                                        onCancel={() => {
                                            setOpenStart(false);
                                        }}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View style={modalStyles.inputWrapper}>
                            <View style={modalStyles.labelWrapper}>
                                <Text style={modalStyles.textLabel}>End Time</Text>
                            </View>
                            <View>
                                <Pressable onPress={() => {}} >
                                    <TextInput
                                        value={schedule?.EndTime}
                                        blurOnSubmit={true}
                                        style={[modalStyles.textInput]}
                                        //onChangeText={(val) => {setStartTime(val)}}
                                        defaultValue={props?.EndTime}
                                        autoFocus={true}
                                    // placeholder="required*"
                                        placeholderTextColor= {requiredFieldColor}
                                        onPressIn={() => {setOpenEnd(true);}}
                                    />
                                    <DatePicker
                                        modal
                                        mode="time"
                                        open={openEnd}
                                        date={endTime}
                                        onConfirm={(val) => {
                                            console.log(val.toLocaleTimeString('en-US'));
                                            setOpenEnd(false);
                                            setEndTime(val);
                                        }}
                                        onCancel={() => {
                                            setOpenEnd(false);
                                        }}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={modalStyles.inputWrapper}>
                        <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Room</Text></View>
                            <TextInput
                            value={schedule?.Room}
                            blurOnSubmit={true}
                            style={modalStyles.textInput}
                            onChangeText={(val) => {setRoom(val)}}
                            defaultValue={props?.Room}
                            autoFocus={true}
                            placeholder=""
                            placeholderTextColor= {requiredFieldColor}
                            />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    modalWrapper: {
        width: '50%',
        height: '40%',
        marginLeft: '20%',
        marginTop: '15%',
    },
    subjectModalWrapper: {
        width: '70%',
        height: '90%',
        marginLeft: '15%',
    },
    timeWrapper: {
        width: '40%',
    },
});

export default ScheduleModal;