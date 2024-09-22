import {RequestTypeEnum} from "./request-type.enum";

export type RequestDataType = {
  name: string,
  phone: string,
  type: RequestTypeEnum,
  service?: string,
}
