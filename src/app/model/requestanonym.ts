import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from './language';

export class RequestAnonym {

  languageIds: number[];
  occasion: string;
  datetime: number[];
  dateDescription: string;

  street: string;
  postalCode: string;
  city: string;

  constructor() {}
}
