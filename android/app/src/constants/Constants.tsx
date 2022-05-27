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
const TIMESLOT_WIDTH = 52;
const TIMESLOTNAME_WIDTH = 40;
const TIMESLOT_PADDINGTOP = 19;
const TIMESLOT_PADDINGLEFT = 5;
const SLOT_STARTTIME = "7:00";
const SLOT_ENDTIME = "23:00";

export {WeekDays, TIMESLOT_HEIGHT, TIMESLOT_WIDTH, TIMESLOTNAME_WIDTH, TIMESLOT_PADDINGTOP, TIMESLOT_PADDINGLEFT};
export {SLOT_STARTTIME, SLOT_ENDTIME};