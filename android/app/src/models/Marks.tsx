/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ModelBase } from "../common/ModelBase";
import { ISubject } from "./Subject";


 interface IMark extends ModelBase{
  Subject?: ISubject;
  SubjectCode: number;
  Mark?: number | undefined | null;
  Weight?: number | undefined | null;
  Title?: string,
  Description?: string,
  SubjectName?: string | undefined,
}

class Mark implements IMark{
  Id!: number;
  SubjectCode!: number;
  Mark?: number | undefined | null;
  Weight?: number | undefined | null;
  Title?: string | undefined;
  Description?: string | undefined;
  DateCreated?: Date | undefined;
  CreatedBy?: string | undefined;
  Subject?: ISubject | undefined;
  SubjectName?: string | undefined;
}

interface IMarkGrouping{
 GroupName?: string,
 Marks?: Mark[]
}

export { Mark }; export type { IMark, IMarkGrouping }; 

