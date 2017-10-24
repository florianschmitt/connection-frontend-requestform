import { Component, OnInit } from '@angular/core';
import { Request } from '../../model/request';
import { Language } from '../../model/language';
import { LanguageService } from '../../services/language.service';
import { RequestService } from '../../services/request.service';
import { I18nService } from '../../services/i18n.service';
import { Observable } from 'rxjs/Observable';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../util/datepicker-i18n';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import * as addMonths from 'date-fns/add_months';

const dayOffset = 4;
const maxMonthOffset = 3;
const now = new Date();

@Component({
  selector: 'request-form',
  providers: [ RequestService, NgbDatepickerConfig, I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}],
  templateUrl: './requestform.component.html',
})
export class RequestformComponent implements OnInit {
  languagesObservable: Observable<Language[]>;
  errorMessage: string;
  model = new Request();
  submitted = false;
  requestid: string;

  constructor (
    private languageService: LanguageService,
    private requestService: RequestService,
    private config: NgbDatepickerConfig,
    private i18n: I18nService) {
    config.minDate = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() + dayOffset };
    const endDate = addMonths(now, maxMonthOffset);
    config.maxDate = { year: endDate.getFullYear(), month: endDate.getMonth() + 1, day: endDate.getDate() + dayOffset };
  }

  ngOnInit() {
    this.refreshLanguages();
  }

  refreshLanguages() {
    this.languagesObservable = this.languageService.getLanguages();
  }

  onSubmit() {
    this.submitted = true;
    this.requestService.placeRequest(this.model)
    .subscribe(
      id => this.requestid = id,
      error => this.errorMessage = <any>error);
  }

  set language(language: string) {
    this.i18n.setLanguage(language).subscribe(() => this.refreshLanguages());
  }

  get language() {
    return this.i18n.language;
  }
}
