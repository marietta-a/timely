/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { WeekDays } from "../constants/Constants";
import { DayOfTheWeek } from "../models/DayOfTheWeek";
import { listViewStyles } from "../pages/SubjectPage";



const Item: React.FC<{
    record: DayOfTheWeek,
    onItemSelected?: any,
}> = ({record, onItemSelected}) => {
    return (
        <TouchableOpacity onPress={() => onItemSelected(record)} style={listViewStyles.contentWrapper} key={record.SortOrder}>
            <View style={listViewStyles.textContainer}>
                <Text>{ record.Day}</Text>
            </View>
        </TouchableOpacity>
    );
};

const WeekDaysListView: React.FC<{
    onItemSelected: any,
}> = ({onItemSelected}) => { 
    const renderItem: React.FC<{
        item : DayOfTheWeek
    }> = ({item}) => (
        <Item key={item.SortOrder}
            record={item}
            onItemSelected={onItemSelected}
        />
    );

    return (
        <FlatList
            data={WeekDays}
            renderItem={renderItem}
            keyExtractor={item => item.SortOrder?.toString() ?? item.ShortName}
        />
    );
};

export default WeekDaysListView;
