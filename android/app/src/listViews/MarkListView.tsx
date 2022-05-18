/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ReactElement } from "react";
import { TouchableOpacity, View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IMark, IMarkGrouping, Mark } from "../models/Marks";
import { listViewStyles } from "../pages/SubjectPage";

/**
 * @param record record is a grouping of mark by subject name `SubjectName`.
 */
const MarkItem: React.FC<{
    record: IMarkGrouping,
    openModal: any,
    onItemSelected: any,
}> = ({record, onItemSelected, openModal}) => {

    if(record == undefined){
       return(
           <SafeAreaView>
               <View>No Mark has been created</View>
           </SafeAreaView>
       )
    }
    const subjectColor = record?.Marks != undefined ? record.Marks[0]?.Subject?.Color : "#777";

    const styles = StyleSheet.create({
      markWrapper: {
          justifyContent: 'flex-start',
          alignItems:  'flex-start',
          backgroundColor: '#eeeeee',
          borderBottomColor: subjectColor,
          borderBottomWidth: 1,
          width: '98%',
          elevation: 2
      },
      contentWrapper: {
          flexDirection: 'row',
          width: '99%',
          backgroundColor: '#ddd',
          marginTop: 5,
          shadowColor:'#dddddd',
          shadowOffset: {
              height: 0,
              width: 2,
          },
          elevation: 2,
      },
    });
        
    return(
        <View>
            <View style={styles.contentWrapper} key={record.GroupName}>
                <View style = {{
                    height: 25,
                    width: 10,
                    backgroundColor: subjectColor ?? '#777',
                }} />
                <View style={listViewStyles.textContainer}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: subjectColor ?? '#777'}}>{record.GroupName}</Text>
                </View>
            </View>
            <View style={styles.markWrapper}>
                {
                    record?.Marks?.map(el => {
                        return(
                            <TouchableOpacity key={el.Id} onPress={onItemSelected(el)}>
                                <View style={{flexDirection: 'row'}}>
                                    <View  style = {{
                                        height: 20,
                                        width: 10,
                                        backgroundColor: subjectColor,
                                    }} />
                                   <View style={{paddingLeft: '10%'}}>
                                     <Text>{el.Mark}</Text>
                                   </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );
    

};


/**
 * @param records a grouping of mark by subject name `SubjectName`.
 */

const MarkListView: React.FC<{
    openModal: any,
    records: IMarkGrouping[],
    onItemSelected: any,
}> = ({openModal, records, onItemSelected}) => { 

    const renderItem: React.FC<{
        item : IMarkGrouping
    }> = ({item}) => (
        <MarkItem
        record={item}
        openModal={openModal}
        onItemSelected={onItemSelected}
        />
    );

    return (
        <FlatList
        data={records}
        renderItem={renderItem}
        keyExtractor={(item, index) => index?.toString()}
        />
    );
};

export default MarkListView;