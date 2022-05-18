/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { ISubject, Subject } from "../models/Subject";
import { listViewStyles } from "../pages/SubjectPage";



const Item: React.FC<{
    record: ISubject,
    openModal: any,
    isDropDownList?: boolean,
    onItemSelected?: any,
}> = ({record, openModal, isDropDownList, onItemSelected}) => {

    const handleDropdownclosing = (item : ISubject) => {
          onItemSelected.bind(this, item);
    };

    if (isDropDownList){
        return (
            <TouchableOpacity onPress={onItemSelected.bind(this, record)} style={listViewStyles.contentWrapper} key={record.Id}>
                <View style = {{
                    height: 25,
                    width: 10,
                    backgroundColor: record.Color,
                }} />
                <View style={listViewStyles.textContainer}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: record?.Color ?? '#777'}}>{record.Name}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    else {
        return (
        <TouchableOpacity onPress={openModal.bind(this, record)} style={listViewStyles.contentWrapper} key={record.Id}>
            <View style = {{
                height: 50,
                width: 10,
                backgroundColor: record.Color,
            }} />
            <View style={listViewStyles.textContainer}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: record?.Color ?? '#777'}}>{record.Name}</Text>
                <Text>{ record.Teacher}</Text>
            </View>
        </TouchableOpacity>
        );
    }
};

const SubjectListView: React.FC<{
    openModal: any,
    subjects: ISubject[],
    isDropDownList?: boolean,
    onItemSelected?: any,
}> = ({openModal, subjects, isDropDownList, onItemSelected}) => { 
    const renderItem: React.FC<{
        item : ISubject
    }> = ({item}) => (
        <Item key={item.Id}
        record={item}
        openModal={openModal}
        isDropDownList={isDropDownList}
        onItemSelected={onItemSelected}
        />
    );

    return (
        <FlatList
        data={subjects}
        renderItem={renderItem}
        keyExtractor={item => item.Id?.toString() ?? item.Name}
        />
    );
};

export default SubjectListView;
