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
import { DataType } from '../../common/DataType';
import {Mark} from '../../models/Mark';

export class ModalBuilder<T> extends Component<T>{
    constructor(props : T){
        super(props);
    }
    propTypes = () => {
        let dataTypes: DataType[] = [];
        if (this.props.children){
            const items = React.Children.toArray(this.props.children);
            items.forEach(item =>{
                const dataType: DataType = {
                    Name: item.toString(),
                    DataType: typeof (item),
                    Value: item.valueOf(),
                };
                dataTypes.push(dataType);
            });
        }

        return dataTypes;
    }

    Item = () => {
        const elements : ReactElement<any>[] = [];
        this.propTypes().forEach(prop => {
            let element: ReactElement;
            if (prop.DataType === String){
               element = (
                    <TextInput
                      placeholder={prop.Name}
                      value = {prop.Value}
                     />
                );
            }
            else {
                element = (
                     <TextInput
                       placeholder={prop.Name}
                       value = {prop.Value}
                      />
                 );
            }
            elements.push(element);
        });
        return elements;
    }

    render (){
        return (
            <SafeAreaView/>
        );
    }
}
