/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */



import React, { Component, ReactElement } from 'react';
import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttonStyles } from '../../assets/styles/ButtonDesigner';
import { defaultHiddenFields, isNullOrEmpty, longest } from '../Functions';
import { ModalBuilder } from '../modal/ModalBuilder';
import { ItemListModel } from '../model/ItemListModel';

let HEADERS: any[] = [];



class ItemListBuilder extends Component<ItemListModel> {
   static SelectedItem : any;
   static handleRefresh?: any;
   static refreshing: boolean;
   
   constructor(props: any){
       super(props);
   }

   handleOpenModal(selectedItem: any){
       ItemListBuilder.SelectedItem = selectedItem;
       this.props.openModal(selectedItem);
   }

    renderItem: React.FC<{
        item : any,
    }> = ({item}) => (
        <Item record={item} openModal={this.handleOpenModal.bind(this, item)}/>
    );

    onRefresh(){
        ItemListBuilder.handleRefresh();
    }

   render (){
    if (this.props.ItemList.length > 0){
            const headers = Object.keys(longest(this.props.ItemList));
            HEADERS = headers;
            return (
                <SafeAreaView style={styles.mainWrapper}>
                    <View>
                        <View>
                            <FlatList
                            data={this.props.ItemList}
                            renderItem={this.renderItem}
                            keyExtractor = {(item, index) => { return (index).toString()}}
                            horizontal={false}
                            refreshing ={ItemListBuilder.refreshing}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            );
    }
    else {
            return (
                <SafeAreaView style={styles.emptyStateWrapper}>
                    <Text>No record has been created</Text>
                </SafeAreaView>
            );
    }
    }
}
const Item: React.FC<{
    record: any,
    openModal?: any,
    }> = ({record, openModal}) => {
        let i = 1;
        const elements = HEADERS.map(function(header){
            if (defaultHiddenFields?.includes(header)){return; }
            else if (header){
                if (header.toString().toLocaleLowerCase().trim() === 'color'){
                    let color = record[header];
                    return isNullOrEmpty(color) ?
                    <View key={i++}>
                        <View style={styles.cellContentWrapper}><Text>{record[header]}</Text></View>
                    </View>
                    : (
                        <View key={0}>
                            <View style={{
                                backgroundColor: color,
                                position: 'relative',
                                height: 20,
                                borderRadius: 20,
                            }}><Text style={{color: color}}>{2}</Text></View>
                        </View>
                    );
                }
                else {
                    return (
                        <View key={i++}>
                            <View style={styles.cellContentWrapper}><Text>{record[header]}</Text></View>
                        </View>
                    );
                }
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
                onPress={openModal}
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
    emptyStateWrapper: {
       width: '100%',
       height: '100%',
       backgroundColor: '#cccccc',
       alignItems: 'center',
       justifyContent: 'center',
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

