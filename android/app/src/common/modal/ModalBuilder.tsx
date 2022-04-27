/* eslint-disable no-new-func */
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
import { Alert, Modal, StyleSheet, Text, View } from 'react-native';
import { ModalState } from '../../models/ModalState';
import { ModalHeader } from '../../modals/ModalHeader';
import { tsImportEqualsDeclaration } from '@babel/types';
import { modalStyles } from '../../assets/ModalDesigner';
import { isNullOrEmpty } from '../../core/Functions';

export class ModalBuilder<T> extends Component<T>{
    static props: any;
    static DATA: any;
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
        let objectTypes: unknown[][] = [];
        if (ModalBuilder.props){
            const items = Object.entries(ModalBuilder.props).map(function(item){
                const dataType: DataType = {
                    Name: item[0],
                    DataType: typeof (item[1]),
                    Value: item[1],
                };
                dataTypes.push(dataType);
                objectTypes.push([item[0], item[1]]);
            });
        }
        ModalBuilder.DATA = Object.fromEntries(objectTypes);
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

            const onChangeText = (val: any)=> {
                 prop.Value = val;
                 ModalBuilder.DATA[prop.Name] = val;
            };
            const focusable = key === 1;
            
            if (prop.DataType === typeof ('')){
               element = (
                   <View key={prop.Name} style={modalStyles.inputWrapper}>
                    <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>{prop.Name}</Text></View>
                        <TextInput
                        key={prop.Name}
                        blurOnSubmit={true}
                        style={modalStyles.textInput}
                        onChangeText={(val) => onChangeText(val)}
                        defaultValue = {isNullOrEmpty(prop.Value) ? null : prop.Value}
                        autoFocus={focusable}
                        />
                    </View>
                );
            }
            else if (prop.DataType === typeof (1)){
               element = (
                   <View key={prop.Name} style={modalStyles.inputWrapper}>
                    <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>{prop.Name}</Text></View>
                    <TextInput
                      key={prop.Name}
                      keyboardType="numeric"
                      blurOnSubmit={true}
                      style={modalStyles.textInput}
                      onChangeText={(val) => onChangeText(val)}
                      defaultValue = {isNullOrEmpty(prop.Value) ? null : prop.Value.toString()}
                      autoFocus={focusable}
                     />
                    </View>
                );
            }
            else {
                element = (
                    <View key={prop.Name} style={modalStyles.inputWrapper}>
                     <View style={modalStyles.labelWrapper}><Text style={modalStyles.textLabel}>{prop.Name}</Text></View>
                     <TextInput
                       placeholder={prop.Name}
                       key={prop.Name}
                       blurOnSubmit={true}
                       style={modalStyles.textInput}
                       onChangeText={(val) => onChangeText(val)}
                       defaultValue = {isNullOrEmpty(prop.Value) ? null : prop.Value.toString()}
                       autoFocus={focusable}
                      />
                    </View>
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
                    <ModalHeader onRequestClose={this.onRequestClose.bind(this)}/>
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

const styles = StyleSheet.create({
    inputWrapper: {
       borderRadius: 2,
       backgroundColor: '#ffffff',
       color: '#000000',
       width: '90%',
       borderWidth: 0.2,
    },
});
