import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from '../../../model/language';
import { Request } from '../../../model/request';

@Component({
    selector: 'summarylist',
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

    getOccasionString() {
      // TODO: hardcoded
      switch(this.request.occasionEnum) {
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
          return this.request.occasionString;
        }
      }

      return this.request.occasionEnum;
    }

    getFormattedDateTime() {
      if (!this.request.date || !this.request.time) {
        return this.request.dateDescription;
      }
      return this.getFormattedDate() + ' ' + this.getFormattedTime();
    }

    getFormattedDate() {
      if (!this.request.date) {
        return '';
      }
      return this.pad(this.request.date.day) + '.' + this.pad(this.request.date.month) + '.' + this.request.date.year;
    }

    getFormattedTime() {
      if (!this.request.time) {
        return '';
      }
      return this.pad(this.request.time.hour || 0) + ':' + this.pad(this.request.time.minute || 0);
    }

    private pad(n: number) {
      return (n < 10) ? ('0' + n) : n;
  }
}
