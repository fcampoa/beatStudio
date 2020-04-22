import { GlobalServiceMethodType, GlobalServiceMethodLiteral } from '.';

export interface IGlobalServiceMethodDefinition {
  method: GlobalServiceMethodType | GlobalServiceMethodLiteral;
  url?: string;
}
