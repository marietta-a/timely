/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useEffect, useState } from "react"
import { Modal } from "react-native";
import WeekDaysListView from "../listViews/WeekDaysListView";
import { DayOfTheWeek } from "../models/DayOfTheWeek";

const WeekDaysDropDown: React.FC<{
 visible: boolean,
 onItemSelected: any,
}> = ({visible, onItemSelected}) => {
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
         transparent={false}
         visible={modalVisible}
        >
           <WeekDaysListView onItemSelected={(item: DayOfTheWeek) => handleItemSelected(item)}/>
       </Modal>
    );
}

export default WeekDaysDropDown;