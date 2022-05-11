/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ModelBase } from "../common/model/ModelBase";


interface ISubject extends ModelBase{
    Name: string,
    Color?: string,
    Teacher?: string,
}

class Subject implements ISubject{
    Id! : number;
    Name!: string;
    Color?: string;
    Teacher?: string;
    DateCreated?: Date;
    CreatedBy?: string;
}

export { Subject };
export type { ISubject };

