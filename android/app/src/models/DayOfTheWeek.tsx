/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

type DayOfTheWeek = {
    Day: string,
    ShortName: string,
    SortOrder: number
 }
 
 type WeekDaySlot = {
     DayOfTheWeek: DayOfTheWeek,
     slot: String,
 }

 export type {DayOfTheWeek, WeekDaySlot}