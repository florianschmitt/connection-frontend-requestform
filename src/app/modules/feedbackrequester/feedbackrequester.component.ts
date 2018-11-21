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
  templateUrl: './feedbackrequester.component.html'
})
export class FeedbackRequesterComponent implements OnInit {
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
    this.feedbackService.hasFeedbackRequester(requestId)
    .subscribe(res => {
      if (res['result']) {
        this.errorMessage = "Vorgang schon bewertet";
      } else {
        this.loadRequest(requestId);
      }
    });
  }

  private loadRequest(requestId: string) {
    this.requestService.getRequest(requestId)
      .subscribe(
        res => {
          this.request = res;
          this.requestId = requestId;
          this.actionsEnabled = true;
        },
        err => {
          this.errorMessage = "Vorgang nicht vorhanden";
        }
      );
  }

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
    this.feedbackService.sendFeedbackRequester(this.requestId, positive, this.commentField)
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
