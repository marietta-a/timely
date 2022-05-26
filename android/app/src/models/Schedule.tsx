import { Timestamp } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";
import { ModelBase } from "../common/ModelBase";
import { Subject } from "./Subject";

interface ISchedule extends ModelBase{
    DayOfTheWeek: number,
    SubjectCode: number,
    StartTime: string,
    EndTime?: string,
    Room?: string,
    Subject?: Subject,
    Color?: string,
}

class Schedule implements ISchedule{
    Id!: number;
    DayOfTheWeek!: number;
    SubjectCode!: number;
    StartTime!: string;
    EndTime?: string | undefined;
    Room?: string | undefined;
    DateCreated?: Date | undefined;
    CreatedBy?: string | undefined;
    Subject?: Subject | undefined;
    Color?: string;
}

export {Schedule}
export type {ISchedule}