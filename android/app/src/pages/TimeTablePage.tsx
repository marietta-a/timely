/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Scheduler from "../common/Scheduler";

const TimeTablePage = () => {
    const [items, setItems] = useState(Object.prototype.constructor()); 

    const loadItems = (day: DateData) => {
        setTimeout(() => {
        for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            console.log(strTime);

            if (!items[strTime]) {
                items[strTime] = [];

                const numItems = Math.floor(Math.random() * 3 + 1);
                for (let j = 0; j < numItems; j++) {
                    items[strTime].push({
                    name: 'Item for ' + strTime + ' #' + j,
                    height: Math.max(50, Math.floor(Math.random() * 150)),
                    day: strTime,
                    });
                }
            }
        }
    }, 1)} ;




    const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

            return (
            <TouchableOpacity
                style={[styles.item, {height: reservation.height}]}
                onPress={() => Alert.alert(reservation.name)}
            >
                <Text style={{fontSize, color}}>{reservation.name}</Text>
            </TouchableOpacity>
            );
        };

    const renderEmptyDate = () => {
        return (
        <View style={styles.emptyDate}>
            <Text>This is empty date!</Text>
        </View>
        );
    };

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    };

    function timeToString(time: number) {
       // const date = new Date(time);
       // return date.toISOString().split('T')[0];

       const date = new Date(time);
       //return date.toISOString().split('T')[0];
       return date.toLocaleTimeString();
    }

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

    const month = new Date().getMonth();
    const futureRange = 12 - month;

    return(
        <SafeAreaView>
            <Scheduler/>
        </SafeAreaView>
    )

  /*  return (
        <SafeAreaView style={{flexDirection:'row', height: '100%'}}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={new Date().toString()}
                pastScrollRange={1}
                futureScrollRange={1}
                staticHeader={false}
                horizontal={false}
                // renderItem={(reservation, isFirst) => renderItem(reservation, isFirst)}
                // renderEmptyDate={renderEmptyDate}
                // rowHasChanged={(r1, r2) => rowHasChanged(r1, r2)}
                // showClosingKnob={true}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#43515c'},
                //    '2017-05-09': {textColor: '#43515c'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                // hideExtraDays={false}
                // showOnlySelectedDayItems
            />
        </SafeAreaView>
    ); */
};

export default TimeTablePage;
