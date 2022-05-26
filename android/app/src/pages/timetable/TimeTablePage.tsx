/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TimetableTemplate from "../../listViews/TimetableTemplate";

const TimeTablePage = () => {

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
           <ScrollView>
               <TimetableTemplate startTime={"5:00"} endTime={"23:00"} />
           </ScrollView>
        </SafeAreaView>
    )
};

export default TimeTablePage;
