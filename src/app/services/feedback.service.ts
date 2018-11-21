import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { FeedbackVolunteer } from '../model/feedbackvolunteer';

@Injectable()
export class FeedbackService {
  private feedbackVolunteerUrl = 'feedbackvolunteer/@ID@';
  private feedbackRequesterUrl = 'feedbackrequester/@ID@';

  constructor (private http: HttpClient) {}

  hasFeedbackRequester(requestIdentifier: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let applicationUrl = this.feedbackRequesterUrl.replace(/@ID@/, requestIdentifier);
    return this.http.get(applicationUrl, { headers: headers});
  }

  hasFeedbackVolunteer(requestIdentifier: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let applicationUrl = this.feedbackVolunteerUrl.replace(/@ID@/, requestIdentifier);
    return this.http.get(applicationUrl, { headers: headers});
  }

  sendFeedbackRequester(requestIdentifier: string, positive: boolean, comment: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let applicationUrl = this.feedbackRequesterUrl.replace(/@ID@/, requestIdentifier);

    return this.http.post(applicationUrl,
      {
        positive: positive,
        comment: comment
      }, { headers: headers, 
           responseType: 'text'});
  }

  sendFeedbackVolunteer(value: FeedbackVolunteer) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let applicationUrl = this.feedbackVolunteerUrl.replace(/@ID@/, value.requestId);

    return this.http.post(applicationUrl,
      {
        hasOccurred: value.hasOccurred,
        wasPositive: value.wasPositive,
        wasCanceled: value.wasCanceled,
        comment: value.comment
      }, { headers: headers, 
           responseType: 'text'});
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
