import { Timestamp } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";
import { ModelBase } from "../common/ModelBase";
import { Subject } from "./Subject";

interface ISchedule extends ModelBase{
    DayOfTheWeek: string,
    SubjectCode: string,
    StartTime: Timestamp,
    EndTime?: Timestamp,
    Room?: string,
    Subject?: Subject
}

class Schedule implements ISchedule{
    Id!: number;
    DayOfTheWeek!: string;
    SubjectCode!: string;
    StartTime!: Timestamp;
    EndTime?: number | undefined;
    Room?: string | undefined;
    DateCreated?: Date | undefined;
    CreatedBy?: string | undefined;
    Subject?: Subject | undefined;
}

export {Schedule}
export type {ISchedule}