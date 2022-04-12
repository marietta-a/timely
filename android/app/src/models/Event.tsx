import { EventType } from "react-native-gesture-handler/lib/typescript/EventType";
import { Timestamp } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";

export interface Event{
    Name: string,
    Date: Date,
    Time?: Timestamp,
    Subject?: string,
    EventType: EventType,
    Description: string
}