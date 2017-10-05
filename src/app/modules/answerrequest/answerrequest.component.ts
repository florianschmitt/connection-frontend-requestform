import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../services/request.service';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'answer-request',
    providers: [RequestService],
    templateUrl: './answerrequest.component.html'
})
export class AnswerRequestComponent implements OnInit {

    message: string;
    voucherId: string;
    wasDeclined: boolean = false;
    actionsEnabled: boolean = false;

    constructor(private route: ActivatedRoute, private requestService: RequestService) { }

    ngOnInit() { this.load(); }

    private load() {
      this.route.params
          .subscribe((params: Params) => {
            this.setVoucherId(params['id']);
          });
    }

    private setVoucherId(voucherId: string) {
        this.requestService.answerVoucherStatus(voucherId)
          .subscribe(
            res => {
              let success = this.checkForErrorResponseAndSetMessage(res.body);
              if (success) {
                this.voucherId = voucherId;
                this.ifDeclineRouteDoDecline();
                this.actionsEnabled = true;
              }
            },
            err => this.checkForErrorResponseAndSetMessage(err.error)
          );
    }

    private checkForErrorResponseAndSetMessage(response: any) : boolean {
      if (response == null || response === '') {
        return true;
      }

      let err = response;
      if (err != null) {
        let errmessage = JSON.parse(err)['message'];

        if (errmessage == null) {
          this.message = "unbekannter Fehler";
          return false;
        }

        if (errmessage == "illegal voucher id") {
          this.message = "Ungültige Anfrage";
        } else if (errmessage == "voucher was already answered") {
          this.message = "Anfrage wurde von Ihnen schon beantwortet";
        } else if (errmessage == "request already accepted") {
          this.message = "Anfrage wurde bereits von jemandem übernommen";
        } else if (errmessage == "request was canceled") {
          this.message = "Anfrage wurde storniert";
        } else if (errmessage == "request is finished") {
          this.message = "Anfrage ist abgeschlossen";
        } else {
          this.message = "unbekannter Fehler";
        }
        return false;
      }
      return true;
    }

    private ifDeclineRouteDoDecline() {
      this.wasDeclined = this.route.snapshot.url.join('').endsWith('decline');
      if (this.wasDeclined) {
        this.decline();
      }
    }

    accept() {
      this.requestService.answerVoucherYes(this.voucherId)
        .subscribe(r => {
          this.message = "Akzeptiert";
          this.actionsEnabled = false;
        });
    }

    decline() {
      this.requestService.answerVoucherNo(this.voucherId)
        .subscribe(r => {
          this.message = "Abgelehnt";
          this.actionsEnabled = false;
        });
    }
}
