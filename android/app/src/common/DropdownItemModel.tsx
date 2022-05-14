/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable prettier/prettier */

import { Option } from "react-dropdown";
import { ItemType } from "react-native-dropdown-picker";
import { DataType } from "./DataType";

interface IDropdownItemModel{
    Items?: Option[],
    Name: string,
    onItemSave?: any,
    onItemSelected?: any,
}

class DropdownItemModel implements IDropdownItemModel{
    Items?: Option[] | undefined;
    Name!: string;
    onItemSave?: any;
    onItemSelected?: any;
}

export { DropdownItemModel };
export type { IDropdownItemModel };

