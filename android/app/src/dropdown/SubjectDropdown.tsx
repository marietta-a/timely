/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, View } from 'react-native';
import { modalStyles } from '../assets/styles/ModalDesigner';
import DefaultCloseModal from '../modals/DefaultCloseModal';
import { ModalState } from '../models/ModalState';
import { ISubject, Subject } from '../models/Subject';
import SubjectPage from '../pages/SubjectPage';


const SubjectDropdown: React.FC<{
    modalState: ModalState,
    props?: Subject,
    onRequestClose: any,
    onItemSelected: any,
    openModal: any,
    style?: any,
}> = ({modalState, props, onRequestClose, onItemSelected, openModal, style}) => {
    
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(()=>{
        const ab = new AbortController();
        if(!ab.signal.aborted){
            setModalVisible(modalState.modalVisible);
        }
        return () => ab.abort();
    }, [modalState.modalVisible])

    const handleRequestClose = () => {
        setModalVisible(false);
        onRequestClose
    };
    const handleItemSelected = (item: ISubject) => {
        onItemSelected(item);
        console.log(item);
        onRequestClose;
    }

    const defaultStyle = style !== undefined? style : 
                        {
                            width: '80%',
                            height: '70%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        };

    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible = {modalVisible}
                onRequestClose={() => handleRequestClose()}
             >
                 <View style={modalStyles.mainWrapper}>
                    <DefaultCloseModal onVisibilityChange={() => handleRequestClose()}/>
                    <View>
                        <SubjectPage
                            isDropDownList={true}
                            onItemSelected={(item: ISubject) => handleItemSelected(item)}
                        />
                    </View>
                 </View>
            </Modal>
    );
};

export default SubjectDropdown;
