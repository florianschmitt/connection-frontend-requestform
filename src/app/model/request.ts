import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from './language';

export class Request {

  languages: Language[];
  occasionEnum: string;
  occasionString: string;
  date: NgbDateStruct;
  time: NgbTimeStruct;
  email: string;
  phonenumber: string;

  requesterName: string;
  requesterInstitution: string;

  street: string;
  postalCode: string;
  city: string;

  englishLanguage: boolean;

  constructor() {
    this.city = "Köln";
  }
}
