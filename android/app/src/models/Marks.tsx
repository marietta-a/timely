/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { ModelBase } from "../common/model/ModelBase";


 interface IMark extends ModelBase{
  Id: number,
  Subject?: string;
  SubjectCode: string;
  Mark: number;
  Weight?: number;
  Title?: string,
  Description?: string
}

class Mark implements IMark{
  Id!: number;
  Subject?: string | undefined;
  SubjectCode!: string;
  Mark!: number;
  Weight?: number | undefined;
  Title?: string | undefined;
  Description?: string | undefined;
  DateCreated?: Date | undefined;
  CreatedBy?: string | undefined;
  
}

export { Mark }; export type { IMark };

