import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class FeedbackService {
  private feedbackUrl = 'feedback/@ID@';

  constructor (private http: HttpClient) {}

  sendFeedback(requestIdentifier: string, positive: boolean, comment: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let applicationUrl = this.feedbackUrl.replace(/@ID@/, requestIdentifier);

    return this.http.post(applicationUrl,
      {
        positive: positive,
        comment: comment
      }, { headers: headers});
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
