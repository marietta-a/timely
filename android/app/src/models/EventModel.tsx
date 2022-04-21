/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { EventType } from "react-native-gesture-handler/lib/typescript/EventType";
import { Timestamp } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";
import { ModelBase } from "../common/model/ModelBase";

export interface EventModel extends ModelBase{
    Id: string,
    Name: string,
    Date?: Date,
    Time?: Timestamp,
    Subject?: string,
    EventType: EventType,
    Description?: string,
    List?: EventModel[],
}