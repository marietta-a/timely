/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { modalStyles, requiredFieldColor } from "../assets/styles/ModalDesigner";
import { isNullOrEmpty } from "../common/Functions";
import SubjectDropdown from "../dropdown/SubjectDropdown";
import WeekDaysDropDown from "../dropdown/WeekDaysDropDown";
import { DayOfTheWeek } from "../models/DayOfTheWeek";
import { ISchedule, Schedule } from "../models/Schedule";
import { ISubject, Subject } from "../models/Subject";

const ScheduleModal: React.FC<{
props: ISchedule,
OnItemSelected: any
}> = (props, OnItemSelected) => {
    const day: DayOfTheWeek = {
        Day: "",
        ShortName: "",
        SortOrder: 0
    };
    
    const [weekDay, setWeekDay] = useState(day);
    const [weekDayVisible, setWeekDayVisible] = useState(false);
    const [schedule, setSchedule] = useState(props?.props);
    const [subject, setSubject] = useState(new Subject());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [dayName, setDayName] = useState('');
    const [subjectVisible, setSubjectVisibility] = useState(false);
    const [subjectName, setSubjectName] = useState('');

    useEffect(() => {
        
    }, [weekDay, subject, startTime, endTime])

    const invokeWeekDayDropdown = () => {
        setWeekDayVisible(true);
    }
    const handleWeedDaySelected = (item: DayOfTheWeek) => {
        setWeekDay(item);
        setWeekDayVisible(false);
    }
    const invokeSubjectDropdown = () => {
        setSubjectVisibility(true);
    }
    const handleSubjectSelected = (item: ISubject) => {
        setSubject(item);
    }

    return(
        <SafeAreaView>
            <Modal
             animationType="slide"
             transparent={false}

            >
                <View style={modalStyles.inputWrapper}>
                <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Day of the week</Text></View>
                    <Pressable onPress={() => invokeWeekDayDropdown()} >
                        <TextInput
                        value={weekDay.Day}
                        blurOnSubmit={true}
                        style={modalStyles.textInput}
                        onChangeText={(val) => {setDayName(val)}}
                        defaultValue={props?.props?.day}
                        autoFocus={true}
                        placeholder="required*"
                        placeholderTextColor= {requiredFieldColor} 
                        editable={false}
                        />
                        <WeekDaysDropDown
                        visible={weekDayVisible}
                        onItemSelected={(item: DayOfTheWeek) => handleWeedDaySelected(item)}
                        />
                    </Pressable>
                </View>
                
              <View style={modalStyles.inputWrapper}>
               <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>Subject</Text></View>
                   <Pressable onPress={() => invokeSubjectDropdown()} >
                      <TextInput
                      value={subject?.Name}
                      blurOnSubmit={true}
                      style={modalStyles.textInput}
                      onChangeText={(val) => {setSubjectName(val)}}
                      defaultValue={props?.props?.SubjectName}
                      autoFocus={true}
                      placeholder="required*"
                      placeholderTextColor= {requiredFieldColor} 
                      editable={false}
                      />
                      <SubjectDropdown
                      modalState={{ modalVisible: subjectVisible }}
                      onRequestClose={() => {setSubjectVisibility(false)}}
                      openModal={() => invokeSubjectDropdown()} 
                      onItemSelected={(item: ISubject) => handleSubjectSelected(item)}
                      />
                   </Pressable>
               </View>
            </Modal>
        </SafeAreaView>
    )
}

export default ScheduleModal;