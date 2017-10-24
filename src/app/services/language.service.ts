import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { I18nService } from './i18n.service';
import { Language } from '../model/language';

@Injectable()
export class LanguageService {
  private applicationUrl = 'getLanguages';

  private langsMap: Map<number, string>;

  constructor (private http: HttpClient, private i18n: I18nService) {
    this.langsMap = new Map<number, string>()
    this.init();
  }

  init() {
    this.getLanguages()
      .subscribe(l => this.addLangs(l, this.langsMap));
  }

  addLangs(langs: Language[], langsMap: Map<number, string>) {
    for (let lang of langs) {
      langsMap.set(lang.id, lang.label);
    }
  }

  public getLang(id: number) {
    return this.langsMap.get(id);
  }

  getLanguages(): Observable<Language[]> {
    let urlWithParams = this.applicationUrl + '?locale=' + this.i18n.language;
    return this.http.get(urlWithParams)
                    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
