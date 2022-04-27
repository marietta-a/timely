/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */



import React, { Component, ReactElement } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttonStyles } from '../../assets/ButtonDesigner';
import { longest } from '../Functions';
import { ModalBuilder } from '../modal/ModalBuilder';
import { ItemListModel } from '../model/ItemListModel';

let WIDTH = '100%';
let HEADERS: any[] = [];



class ItemListBuilder extends Component<ItemListModel> {
   constructor(props: any){
       super(props);
   }


 ItemHeader: React.FC<{
   HeaderItems: any[]
}> = ({HeaderItems}) => {
    let i = 1000;
    const elements = HeaderItems?.map(function(item){
        return (
            <View key={i--}>
                <View style={styles.cellHeaderWrapper}><Text>{item}</Text></View>
            </View>
        );
    });

    return (
            <View style={styles.rowWrapper}>
            {
                elements != null ?
                elements.map(function(item){
                    console.log(item);
                    return item;
                }) : null
            }
            </View>
        );
};

 renderItem: React.FC<{
    item : Object,
 }> = ({item}) => (
     <Item record={item} openModal={this.props.openModal}/>
 );

   render (){
    if (this.props.ItemList){
            const headers = Object.keys(longest(this.props.ItemList));
            HEADERS = headers;
            let i = 0;
            const colnum = headers.length;
            WIDTH = Math.ceil(100 / (colnum)) + '%';
            return (
                <SafeAreaView style={styles.mainWrapper}>
                    <View>
                        <View>
                            <FlatList
                            data={this.props.ItemList}
                            renderItem={this.renderItem}
                            keyExtractor = {(item) => (i++).toString()}
                            horizontal={false}
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
    }
}
const Item: React.FC<{
    record: any,
    openModal?: any,
    }> = ({record, openModal}) => {
        let i = 0;
        const itemList = Object.entries(record);
        const elements = HEADERS.map(function(header){
            if (record[header]){
                return (
                    <View key={i++}>
                        <View style={styles.cellContentWrapper}><Text>{record[header]}</Text></View>
                    </View>
                );
            }
        else {
                return (
                    <View key={i++}>
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
                <TouchableOpacity
                style = {styles.rowWrapper}
                onPress={openModal.bind(this)}
                >
                    {elements.map(function(item){
                        return item;
                    })}
                </TouchableOpacity>
            );
};


const styles = StyleSheet.create({
    mainWrapper: {
       width: '100%',
       height: '100%',
       backgroundColor: '#cccccc'
    },
    rowWrapper: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        margin: 2,
        borderRadius: 10,
        shadowColor:'black',
        shadowOffset: {
            height: 1,
            width: 5,
        },
        elevation: 6,
        alignItems: 'center',
    },
    cellContentWrapper:{
        justifyContent: 'space-between',
        alignContent: 'space-around',
        padding: 10,
    },
    cellHeaderWrapper:{
      justifyContent:'space-around'
    },
    headerWrapper: {
       borderWidth: 0.5,
       padding: 6,
       backgroundColor: '#dfdfdf',
    },
});



export default ItemListBuilder;

