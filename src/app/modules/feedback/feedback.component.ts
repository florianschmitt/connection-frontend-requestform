import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FeedbackService } from '../../services/feedback.service';
import { RequestAnonym } from '../../model/requestanonym';
import 'rxjs/add/operator/switchMap';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'feedback',
  providers: [FeedbackService, RequestService],
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  successMessage: string;
  errorMessage: string;
  requestId: string;
  wasDeclined: boolean = false;
  actionsEnabled: boolean = false;
  request: RequestAnonym;
  commentField: string;

  constructor(private route: ActivatedRoute,
    private requestService: RequestService,
    private feedbackService: FeedbackService) { }

  ngOnInit() { this.load(); }

  private load() {
    this.route.params
      .subscribe((params: Params) => {
        this.setRequestId(params['id']);
      });
  }

  private setRequestId(requestId: string) {
    this.requestService.getRequest(requestId)
      .subscribe(
        res => {
          // let success = this.checkForErrorResponseAndSetMessage(res.body);
          // if (success) {
          this.request = res;
          this.requestId = requestId;
          // this.loadRequest();
          // this.ifDeclineRouteDoDecline();
          this.actionsEnabled = true;
          // }
        },
        err => {
          this.errorMessage = "Vorgang nicht vorhanden";
        }//this.checkForErrorResponseAndSetMessage(err.error)
      );
  }

  // private loadRequest() {
  //   this.requestService.getRequestByVoucher(this.voucherId)
  //     .subscribe(r => this.request = r);
  // }

  private checkForErrorResponseAndSetMessage(response: any): boolean {
    if (response == null || response === '') {
      return true;
    }

    let err = response;
    if (err != null) {
      let errmessage = err['message'];

      if (errmessage == null) {
        this.errorMessage = "unbekannter Fehler";
        return false;
      }

      if (errmessage == "request is not yet finished") {
        this.errorMessage = "Vorgang noch nicht abgeschlossen";
      } else {
        this.errorMessage = "unbekannter Fehler";
      }
      return false;
    }
    return true;
  }

  positive() {
    this.sendFeedback(true);
  }

  negative() {
    this.sendFeedback(false);
  }

  private sendFeedback(positive: boolean) {
    this.feedbackService.sendFeedback(this.requestId, positive, this.commentField)
    .subscribe(r => {
      let success = this.checkForErrorResponseAndSetMessage(r);
      if (success) {
        this.successMessage = "Gesendet";
      } else {
        this.successMessage = '';
      }
      this.actionsEnabled = false;
    });
  }
}
