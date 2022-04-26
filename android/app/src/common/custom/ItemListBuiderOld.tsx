/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */



import React, { Component, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { longest } from '../Functions';

let WIDTH = '100%';
let HEADERS: any[] = [];

const Item: React.FC<{
    record: any,
    style?: any
}> = ({record}) => {
    let i = 0;
    const itemList = Object.entries(record);
    const elements = HEADERS.map(function(header){
        if (record[header]){
            return (
                <View key={i++} style={{width: WIDTH}}>
                    <View style={styles.cellContentWrapper}><Text>{record[header]}</Text></View>
                </View>
            );
        }
       else {
            return (
                <View key={i++} style={{width: WIDTH}}>
                    <View style={styles.cellContentWrapper}><Text/></View>
                </View>
            );
       }
    });
    /*const elements = Object.entries(record).map(function(item){
        return (
            <View key={i++} style={{width: WIDTH}}><Text>{item[1]}</Text></View>
        );
    });*/

    return (
            <View style={styles.rowWrapper}>
            {elements.map(function(item){
                return item;
            })}
            </View>
        );
};

const ItemHeader: React.FC<{
   HeaderItems: any[]
}> = ({HeaderItems}) => {
    let i = 1000;
    const elements = HeaderItems?.map(function(item){
        return (
            <View key={i--} style={{width: WIDTH}}>
                <View style={styles.cellHeaderWrapper}><Text>{item}</Text></View>
            </View>
        );
    });

    return (
            <View style={styles.rowWrapper}>
            {
                elements != null ?
                elements.map(function(item){
                    return item;
                }) : null
            }
            </View>
        );
};

const renderItem: React.FC<{
    item : Object,
 }> = ({item}) => (
     <Item record={item}/>
 );

const ItemListBuilder: React.FC<{
  ItemList?: any[]
}> = ({ItemList}) => {
   if (ItemList){
        const headers = Object.keys(longest(ItemList));
        HEADERS = headers;
        let i = 0;
        const colnum = headers.length;
        WIDTH = Math.ceil(100 / (colnum)) + '%';
        return (
            <SafeAreaView>
                <View style={styles.mainWrapper}>
                    <View>
                        <FlatList
                        ListHeaderComponent={(<ItemHeader HeaderItems={headers}/>)}
                        ListHeaderComponentStyle={styles.headerWrapper}
                        data={ItemList}
                        renderItem={renderItem}
                        keyExtractor = {(item) => (i++).toString()}
                        horizontal={false}
                        contentContainerStyle={styles.mainWrapper}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
   }
   else {
        return (
            <SafeAreaView>
                <Text>No record found</Text>
            </SafeAreaView>
        );
   }
};

const styles = StyleSheet.create({
    mainWrapper: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowWrapper: {
       flexDirection: 'row',
    },
    cellContentWrapper:{
        borderWidth: 0.1,
        elevation: 0.2,
        alignItems: 'center',
    },
    cellHeaderWrapper:{
      alignItems: 'center'
    },
    headerWrapper: {
       borderWidth: 0.5,
       padding: 6,
       backgroundColor: '#dfdfdf',
    },
});


export default ItemListBuilder;

