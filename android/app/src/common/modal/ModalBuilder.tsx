/* eslint-disable no-trailing-spaces */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component, ReactElement } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataType } from '../model/DataType';
import {Mark} from '../../models/Mark';

export class ModalBuilder<T> extends Component<T>{
    static props: any;
    static list: any;
    constructor(props : T){
        super(props);
        ModalBuilder.props = props;
    }
   static propTypes = () => {
        let dataTypes: DataType[] = [];
        if (ModalBuilder.props){
            
            const items = Object.entries(ModalBuilder.props).map(function(item){
                console.log(ModalBuilder.props)
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

    Item = () => {
        let key = 0;
        const elements : ReactElement<any>[] = [];
        ModalBuilder.propTypes().forEach(prop => {
            key++;
            let element: ReactElement;
            if (prop.DataType === String){
               element = (
                    <TextInput
                      placeholder={prop.Name}
                      value = ""
                      key={key}
                     />
                );
            }
            else {
                element = (
                     <TextInput
                       placeholder={prop.Name}
                       value = ""
                       key={key}
                      />
                 );
            }
            elements.push(element);
        });
        return elements;
    }

    render (){
        console.log(this.Item());
        return (
            <SafeAreaView>
                {this.Item().map(function(item){
                    return item;
                })}
            </SafeAreaView>
        );
    }
}
