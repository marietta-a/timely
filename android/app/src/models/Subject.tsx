/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ModelBase } from "../common/model/ModelBase";


export interface Subject extends ModelBase{
    Id : string,
    Name: string,
    Color: string,
    Teacher: string,
    List?: Subject[]
}

