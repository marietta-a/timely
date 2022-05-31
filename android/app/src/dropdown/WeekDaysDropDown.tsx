/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react"
import { Modal, StyleSheet, View } from "react-native";
import { modalStyles } from "../assets/styles/ModalDesigner";
import WeekDaysListView from "../listViews/WeekDaysListView";
import { DayOfTheWeek } from "../models/DayOfTheWeek";

const WeekDaysDropDown: React.FC<{
 visible: boolean,
 onItemSelected: any,
 style?: any,
}> = ({visible, onItemSelected, style}) => {
    const [modalVisible, setModalVisible] = useState(visible);

    useEffect(() => {
        setModalVisible(visible);
    }, [visible])
    
    const handleItemSelected = (item: DayOfTheWeek) => {
        onItemSelected(item);
        setModalVisible(false);
    }

    return(
       <Modal 
         animationType="fade"
         transparent={true}
         visible={modalVisible}
        >
            <View style={[modalStyles.mainWrapper, style]}>
                <WeekDaysListView onItemSelected={(item: DayOfTheWeek) => handleItemSelected(item)}/>
            </View>
       </Modal>
    );
};

export default WeekDaysDropDown;
