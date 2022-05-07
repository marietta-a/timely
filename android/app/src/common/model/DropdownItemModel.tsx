/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

export interface DropdownItemModel<T>{
    Items?: T[],
    Name: string,
    onItemSave?: any
}
