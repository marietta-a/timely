/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ModelBase } from "../common/ModelBase";
import { ISubject } from "./Subject";


 interface IMark extends ModelBase{
  Subject?: ISubject;
  SubjectCode: number;
  Mark: number;
  Weight?: number;
  Title?: string,
  Description?: string
}

class Mark implements IMark{
  Id!: number;
  SubjectCode!: number;
  Mark!: number;
  Weight?: number | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  DateCreated?: Date | undefined;
  CreatedBy?: string | undefined;
  Subject?: ISubject | undefined;
}

export { Mark }; export type { IMark };

