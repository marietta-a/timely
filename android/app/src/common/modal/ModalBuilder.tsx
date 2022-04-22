/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, ReactElement, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataType } from '../model/DataType';
import {Mark} from '../../models/Marks';
import { Modal, StyleSheet, View } from 'react-native';
import { ModalState } from '../../models/ModalState';
import { CloseModal } from '../../modals/CloseModal';
import { tsImportEqualsDeclaration } from '@babel/types';
import { modalStyles } from '../../assets/ModalDesigner';

export class ModalBuilder<T> extends Component<T>{
    static props: any;
    static modalVisible: boolean = false;
    constructor(props : T){
        super(props);
        ModalBuilder.props = props;
    }
    state: ModalState = {
        modalVisible: ModalBuilder.modalVisible,
    };
    static propTypes = () => {
        let dataTypes: DataType[] = [];
        if (ModalBuilder.props){
            
            const items = Object.entries(ModalBuilder.props).map(function(item){
                const dataType: DataType = {
                    Name: item[0],
                    DataType: typeof (item[0]),
                    Value: item[1],
                };
                dataTypes.push(dataType);
            });
        }

        return dataTypes;
    }

    onRequestClose(){
       this.setState({modalVisible: false});
        ModalBuilder.modalVisible = false;
    }

    Item = () => {
        let key = 0;
        const elements : ReactElement<any>[] = [];
        ModalBuilder.propTypes().forEach(prop => {
            key++;
            let element: ReactElement;
            var itemValue = prop.Value;
            const setItemValue = (val: any) => {
                itemValue = val;
                console.log(val);
            };
            if (prop.DataType === String){
               element = (
                    <TextInput
                      placeholder={prop.Name}
                      value = {itemValue}
                      key={key}
                      onChangeText ={(txt) => setItemValue(txt)}
                      
                     />
                );
            }
            else {
                element = (
                     <TextInput
                       placeholder={prop.Name}
                       value = ""
                       key={key}
                       onChangeText={() => {}}
                      />
                 );
            }
            elements.push(element);
        });
        return elements;
    }

    render (){
        return (
            <SafeAreaView>
                <Modal
                  transparent={true}
                  animationType="slide"
                  onRequestClose={this.onRequestClose.bind(this)}
                  visible={ModalBuilder.modalVisible}
                >
                <View style={modalStyles.mainWrapper}>
                    <CloseModal onRequestClose={this.onRequestClose.bind(this)}/>
                    <View style={modalStyles.modalView}>
                        {this.Item().map(function(item){
                            return item;
                        })}
                    </View> 
                </View>
                </Modal> 
                
            </SafeAreaView>
        );
    }
}