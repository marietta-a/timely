/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { Component } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { modalStyles } from "../assets/ModalDesigner";
import { ModalBuilder } from "../common/modal/ModalBuilder";
import { EventModel } from "../models/EventModel";
import { ModalState } from '../models/ModalState';
import { CloseModal } from "./CloseModal";

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
                    <CloseModal onRequestClose={() => this.props.onRequestClose}/>
                    <ModalBuilder<EventModel> Id={""} Name={""} EventType={0}/>
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
