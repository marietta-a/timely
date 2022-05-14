/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import DefaultCloseModal from '../modals/DefaultCloseModal';
import { ModalState } from '../models/ModalState';
import { ISubject, Subject } from '../models/Subject';
import SubjectPage from '../pages/SubjectPage';


const SubjectDropdown: React.FC<{
    modalState: ModalState,
    props?: Subject,
    onRequestClose: any,
    onItemSelected?: any,
    openModal: any
}> = ({modalState, props, onRequestClose, onItemSelected, openModal}) => {

    const [modalVisible, setModalVisible] = useState(modalState.modalVisible);

    const handleRequestClose = () => {
        setModalVisible(false);
        onRequestClose.bind(this);
    };

    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible = {modalVisible}
                onRequestClose={() => handleRequestClose()}
             >
                 <DefaultCloseModal onVisibilityChange={onRequestClose}/>
                 <View>
                    <SubjectPage
                    isDropDownList={true}
                    onItemSelected={onItemSelected}
                    />
                </View>
            </Modal>
    );
};

export default SubjectDropdown;
