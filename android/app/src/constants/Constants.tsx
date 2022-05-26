/* eslint-disable no-return-assign */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DayOfTheWeek } from "../models/DayOfTheWeek";

const WeekDays: DayOfTheWeek[] = [
    {
        Day: "Sunday",
        ShortName: "Sun",
        SortOrder: 0
    },
    {
        Day: "Monday",
        ShortName: "Mon",
        SortOrder: 1 
    },
    {
        Day: "Tuesday",
        ShortName: "Tue",
        SortOrder: 2
    },
    {
        Day: "Wednesday",
        ShortName: "Wed",
        SortOrder: 3
    },
    {
        Day: "Thursday",
        ShortName: "Thu",
        SortOrder: 4
    },
    {
        Day: "Friday",
        ShortName: "Fri",
        SortOrder: 5
    },
    {
        Day: "Saturday",
        ShortName: "Sat",
        SortOrder: 6
    }
]

const TIMESLOT_HEIGHT = 40;

export {WeekDays, TIMESLOT_HEIGHT};