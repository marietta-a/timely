/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddButton from '../../common/AddButton';
import SubjectModal from '../../modals/SubjectModal';
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

let subjectColor = '#000000';

const Item: React.FC<{
    record: Subject
}> = ({record}) => (

    <View style={styles.container}>
        <View style = {{
            height: 50,
            width: 10,
            backgroundColor: record.Color,
        }} />
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
    state = {
        modalVisble: false
    }

   invokeModal(){
        //console.log('triggered');
        this.setState({modalVisble: true});
    }


    render(){
        return (
            <SafeAreaView style={styles.main}>
                <FlatList
                  data={STUDENTS}
                  renderItem={renderItem}
                  keyExtractor={item => item.Id}
                />
                <AddButton 
                    style={styles.buttonAdd} 
                    onButtonClicked={this.invokeModal.bind(this)}
                />
                <SubjectModal style={styles.modalWrapper} modalVisible={this.state.modalVisble}/>
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
            borderTopWidth: 0.3,
            borderTopColor: subjectColor,

        },
        header: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        textContainer: {
            paddingLeft: 4,
        },
        main: {
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          height: '100%',
          width: '100%',
        },
        buttonAdd: {
            zIndex: 1,
            position: 'absolute',
            bottom: '15%',
            right: '25%',
        },
        modalWrapper: {
            position: 'relative',
            marginTop: '40%',
            height: '50%',
            width: '50%'
        }
    }
);

export default SubjectPage;
