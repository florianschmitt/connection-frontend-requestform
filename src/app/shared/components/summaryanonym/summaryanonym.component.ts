import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Language } from '../../../model/language';
import { RequestAnonym } from '../../../model/requestanonym';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'summaryanonym',
    templateUrl: './summaryanonym.component.html'
})
export class SummaryAnonymComponent {
    @Input() request: RequestAnonym;

    constructor(private languageService: LanguageService) { }

    getLanguagesList() {
      if (!this.request.languageIds) {
        return '';
      }
      return this.request.languageIds.map(l => this.languageService.getLang(l)).join(', ');
    }

    public timestring(v: number[]) {
        let year = v[0];
        let month = this.pad(v[1]);
        let day = this.pad(v[2]);
        let hour = this.pad(v[3]);
        let min = this.pad(v[4]);
        return day + '.' + month + '.' + year + ' - ' + hour + ':' + min;
    }

    getFormattedDateTime() {
      return this.timestring(this.request.datetime);
    }

    private pad(n: number) {
        return (n < 10) ? ('0' + n) : n;
    }
}
