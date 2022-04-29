/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { modalStyles } from "../assets/styles/ModalDesigner";
import { ModalBuilder } from "../common/modal/ModalBuilder";
import { Events } from "../models/Events";
import { ModalState } from '../models/ModalState';
import { ModalHeader } from "./ModalHeader";

class EventModal extends Component<ModalState>{
    constructor(props : any){
        super(props);
    }

    render(){
        const modalVisible = this.props.modalVisible;
        return (
            <SafeAreaView>
                <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => this.props.onRequestClose}
                >
                <View style={modalStyles.mainWrapper}>
                    <ModalHeader onRequestClose={() => this.props.onRequestClose}/>
                    <ModalBuilder<Events> Id={""} Name={""} EventType={0}/>
                </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainWrapper: {
       backgroundColor: 'black',
       width: '0%'
    },
});

export default EventModal;
