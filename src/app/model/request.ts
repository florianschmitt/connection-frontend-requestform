import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from './language';

export class Request {

  languages: Language[];
  ocation: string;
  date: NgbDateStruct;
  time: NgbTimeStruct;
  email: string;
  phonenumber: string;

  requesterName: string;
  requesterInstitution: string;

  street: string;
  postalCode: string;
  city: string;

  constructor() {
    this.city = "Köln";
  }
}
