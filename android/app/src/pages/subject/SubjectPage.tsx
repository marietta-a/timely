/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddButton from '../../common/AddButton';
import { Subject } from '../../models/Subject';

const STUDENTS : Subject[] = [
    {
        Id : '01',
        Name: 'Maths',
        Color: '#571d33',
        Teacher: 'p2' ,
    },
    {
        Id: '02',
        Name: 'Computer Science',
        Color: 'red',
        Teacher: 'T3' ,
    },
];

const Item: React.FC<{
    record: Subject
}> = ({record}) => (
    <View style={styles.container}>
        <View style = {{
            height: 50,
            width: 10,
            backgroundColor: record.Color
        }}></View>
        <View style={styles.textContainer}>
            <Text style={styles.header}>{record.Name}</Text>
            <Text>{record.Teacher}</Text>
        </View>
    </View>
);

const renderItem: React.FC<{
    item : Subject
 }> = ({item}) => (
     <Item record={item}/>
 );
class SubjectPage extends Component{
    render(){
        return (
            <SafeAreaView style={styles.main}>
                <FlatList
                  data={STUDENTS}
                  renderItem={renderItem}
                  keyExtractor={item => item.Id}
                />
                <AddButton style={null}/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 4,
            borderTopWidth: 1,

        },
        header: {
            fontSize: 18,
            fontWeight: 'bold'
        },
        textContainer: {
            paddingLeft: 4
        },
        main: {
          display: 'flex',
          flexDirection: 'column'
        },
        buttonAdd: {

        }
    }
)

export default SubjectPage;
