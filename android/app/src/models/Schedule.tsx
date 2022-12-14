/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import {ModelBase} from '../common/ModelBase';
import { DayOfTheWeek } from './DayOfTheWeek';
import {Subject} from './Subject';

interface ISchedule extends ModelBase {
  DayOfTheWeek: number
  SubjectCode: number;
  StartTime: string;
  EndTime?: string;
  Room?: string;
  Subject?: Subject;
  SubjectName?: string;
  day?: string;
  Color?: string;
}

class Schedule implements ISchedule {
  Id!: number;
  DayOfTheWeek!: number;
  SubjectCode!: number;
  StartTime!: string;
  EndTime?: string | undefined;
  Room?: string | undefined;
  DateCreated?: Date | undefined;
  CreatedBy?: string | undefined;
  Subject?: Subject | undefined;
  SubjectName?: string;
  day?: string | undefined;
  WeekDay?: DayOfTheWeek | undefined;
  Color?: string | undefined;
}

export {Schedule};
export type {ISchedule};
