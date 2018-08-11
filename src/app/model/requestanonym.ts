import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from './language';

export class RequestAnonym {

  languageIds: number[];
  occasionString: string;
  datetime: number[];

  street: string;
  postalCode: string;
  city: string;

  constructor() {}
}
