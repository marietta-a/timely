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
    style?: any,
    modalHeaderVisible?: boolean,
}> = ({modalState, props, onRequestClose, onItemSelected, style, modalHeaderVisible}) => {
    
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

    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible = {modalState.modalVisible}
                onRequestClose={() => handleRequestClose()}
             >
                 <View style={[modalStyles.mainWrapper, style]}>
                    <DefaultCloseModal onVisibilityChange={() => handleRequestClose()}/>
                    <View>
                        <SubjectPage
                            isDropDownList={true}
                            onItemSelected={(item: ISubject) => handleItemSelected(item)}
                            modalHeaderVisible={modalHeaderVisible}
                        />
                    </View>
                 </View>
            </Modal>
    );
};

export default SubjectDropdown;
