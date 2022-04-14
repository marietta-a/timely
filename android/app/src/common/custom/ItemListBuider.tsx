/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */



import React, { Component, ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Item: React.FC<{
    record: Object
}> = ({record}) => {
    let i = 0;
    const elements = Object.entries(record).map(function(item){
        return (
            <Text key={i++}>{item[0]}</Text>
        );
    });

    return (
            <View>
            {elements.map(function(item){
                console.log(item);
                return item;
            })}
            </View>
        );
};
const ItemHeader: React.FC<{
   HeaderItems: string[]
}> = ({HeaderItems}) => {
    let i = 1000;
    const elements = HeaderItems.map(function(item){
        return (
            <Text key={i--}>{item}</Text>
        );
    });

    return (
            <View>
            {elements.map(function(item){
                return item;
            })}
            </View>
        );
}
const renderItem: React.FC<{
    item : Object
 }> = ({item}) => (
     <Item record={item}/>
 );

const ItemListBuilder: React.FC<{
  ItemList?: any[],
  Headers: any[]
}> = ({ItemList, Headers}) => {
   if (ItemList){
        const record = ItemList[0];
        let i = 0;
        return (
            <SafeAreaView>
                <View>
                    <ItemHeader HeaderItems={Headers}/>
                </View>
                <View>
                    <FlatList
                    data={ItemList}
                    renderItem={renderItem}
                    keyExtractor = {(item) => (i++).toString()}
                    />
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


export default ItemListBuilder;

