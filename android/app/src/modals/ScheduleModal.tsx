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

const ScheduleModal: React.FC<{
props: ISchedule,
OnItemSelected: any,
modalVisible: boolean,
onModalClosing?: any,
}> = ({props, OnItemSelected, modalVisible, onModalClosing}) => {
    const day: DayOfTheWeek = {
        Day: "",
        ShortName: "",
        SortOrder: 0
    };
    const [weekDay, setWeekDay] = useState(day);
    const [weekDayVisible, setWeekDayVisible] = useState(false);
    const [schedule, setSchedule] = useState(props);
    const [subject, setSubject] = useState(new Subject());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dayName, setDayName] = useState('');
    const [subjectVisible, setSubjectVisibility] = useState(false);
    const [subjectName, setSubjectName] = useState('');


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
        onModalClosing(false);
    };
    const handleSubjectModalClosing = () => {
        setSubjectVisibility(false);
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
                    <ModalHeader deleteVisible={false} onRequestClose={() => handleModalClosing()} />
                    <View style={modalStyles.inputWrapper}>
                    <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Day of the week</Text></View>
                        <Pressable onPress={() => invokeWeekDayDropdown()} >
                            <TextInput
                            value={weekDay.Day}
                            blurOnSubmit={true}
                            style={modalStyles.textInput}
                            onChangeText={(val) => {setDayName(val)}}
                            defaultValue={props?.day}
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
                                value={subject?.Name}
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
                </View>
            </Modal>
        </SafeAreaView>
    )
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
        marginLeft: '15%'
    }
});

export default ScheduleModal;