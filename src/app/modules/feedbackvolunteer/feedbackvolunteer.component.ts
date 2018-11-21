import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FeedbackService } from '../../services/feedback.service';
import { RequestAnonym } from '../../model/requestanonym';
import { FeedbackVolunteer } from '../../model/feedbackvolunteer';
import 'rxjs/add/operator/switchMap';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'feedbackvolunteer',
  providers: [FeedbackService, RequestService],
  templateUrl: './feedbackvolunteer.component.html'
})
export class FeedbackVolunteerComponent implements OnInit {
  errorMessage: string;
  actionsEnabled: boolean = false;
  request: RequestAnonym;
  model: FeedbackVolunteer;
  commentHidden: boolean = true;
  commentField: string;
  wasPositiveVisible = false;
  wasCanceledVisible = false;
  confirmationHidden = true;
  hasOccurredVisible = false;

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
    this.feedbackService.hasFeedbackVolunteer(requestId)
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
          this.model = new FeedbackVolunteer();
          this.model.wasCanceled = false;
          this.model.wasPositive = false;
          this.model.requestId = requestId;
          this.actionsEnabled = true;
          this.hasOccurredVisible = true;
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

  step1(hasOccurred: boolean) {
    this.model.hasOccurred = hasOccurred;
    if (hasOccurred) {
      this.wasPositiveVisible = true;
    } else {
      this.wasCanceledVisible = true;
    }
  }

  step2(value: boolean) {
    if (this.model.hasOccurred) {
      this.model.wasPositive = value;
      if(value) {
        this.sendFeedback();
      } else {
        this.commentHidden = false
      }
    } else {
      this.model.wasCanceled = value;
      this.sendFeedback();
    }
  }

  sendAfterComment() {
    if (this.commentField) {
      this.sendFeedback();
    }
  }

  private sendFeedback() {
    this.model.comment = this.commentField;

    this.feedbackService.sendFeedbackVolunteer(this.model)
      .subscribe(r => {
        let success = this.checkForErrorResponseAndSetMessage(r);
        if (success) {
          this.confirmationHidden = false;
        } 
        this.actionsEnabled = false;
      });
  }
}
