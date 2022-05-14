/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { EventType } from "react-native-gesture-handler/lib/typescript/EventType";
import { Timestamp } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";
import { ModelBase } from "../common/ModelBase";

export interface Events extends ModelBase{
    Name: string,
    EventDate?: Date,
    Time?: Timestamp,
    Subject?: string,
    SubjectCode?: string,
    EventType?: EventType,
    EventTypeCode?: EventType,
    Description?: string,
}
