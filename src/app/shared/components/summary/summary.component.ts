import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from '../../../model/language';
import { Request } from '../../../model/request';

@Component({
    selector: 'summary',
    templateUrl: './summary.component.html'
})
export class SummaryComponent implements OnInit {
    @Input() requestId: string;
    @Input() request: Request;

    constructor() { }

    ngOnInit() {
    }

    getLanguagesList() {
      if (!this.request.languages) {
        return '';
      }
      return this.request.languages.map(l => l.label).join(', ');
    }

    getOccationString() {
      // TODO: hardcoded
      switch(this.request.occationEnum) {
        case 'DOCTOR': {
          return 'Arzt';
        }
        case 'GOVERNMENT': {
          return 'Amt';
        }
        case 'ATTORNEY': {
          return 'Anwalt';
        }
        case 'RECREATION': {
          return 'Freizeitveranstaltung';
        }
        case 'OTHER': {
          return this.request.occationString;
        }
      }

      return this.request.occationEnum;
    }

    getFormattedDateTime() {
      if (!this.request.date || !this.request.time) {
        return '';
      }
      return this.getFormattedDate() + ' ' + this.getFormattedTime();
    }

    getFormattedDate() {
      if (!this.request.date) {
        return '';
      }
      return this.request.date.day + '.' + this.request.date.month + '.' + this.request.date.year;
    }

    getFormattedTime() {
      if (!this.request.time) {
        return '';
      }
      return (this.request.time.hour || 0) + ':' + (this.request.time.minute || 0);
    }
}
