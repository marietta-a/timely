/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { EventListenerCallback } from "@react-navigation/native";
import { DropdownItemModel } from "./DropdownItemModel";

export interface ItemListModel{
    ItemList: any,
    style?: any,
    openModal: any,
    dropdownItems?: DropdownItemModel<any>[]
}
