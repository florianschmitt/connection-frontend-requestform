import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders }          from '@angular/common/http';
import { HttpResponse }          from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Request } from './model/request';

@Injectable()
export class RequestService {
  private applicationUrl = 'placeRequest';
  private answerVoucherYesUrl = 'answerRequest/@ID@/yes';
  private answerVoucherNoUrl = 'answerRequest/@ID@/no';
  private answerVoucherStatusUrl = 'answerRequest/@ID@/status';

  constructor (private http: HttpClient) {}

  placeRequest(request: Request): Observable<string> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.applicationUrl,
      {
        languageIds: request.languages.map(l => l.id),
        datetime: this.formatDate(request),
        ocation: request.ocation,
        street: request.street,
        postalCode: request.postalCode,
        requesterName: request.requesterName,
        requesterInstitution: request.requesterInstitution,
        city: request.city,
        email: request.email,
        phone: request.phonenumber
      }, { headers: headers})
        .map(response => response['requestId'])
        .catch(this.handleError);
  }

  answerVoucherYes(voucherId: string) {
    let applicationUrl = this.answerVoucherYesUrl.replace(/@ID@/, voucherId);
    return this.http.post(applicationUrl, null);
  }

  answerVoucherNo(voucherId: string) {
    let applicationUrl = this.answerVoucherNoUrl.replace(/@ID@/, voucherId);
    return this.http.post(applicationUrl, null);
  }

  answerVoucherStatus(voucherId: string) {
    let applicationUrl = this.answerVoucherStatusUrl.replace(/@ID@/, voucherId);
    return this.http.get(applicationUrl, { observe: 'response' });
  }

  private formatDate(request: Request) {
    let res = request.date.year + '-' + this.pad(request.date.month) + '-'
          + this.pad(request.date.day) + 'T' + this.pad(request.time.hour) + ':' + this.pad(request.time.minute) + ':00.000Z';
    return res;
  }

  private pad(n: number) {
      return (n < 10) ? ('0' + n) : n;
  }

  private handleError (error: HttpResponse<any> | any) {
    let errMsg: string;
    if (error instanceof HttpResponse) {
      const body = error.body || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
