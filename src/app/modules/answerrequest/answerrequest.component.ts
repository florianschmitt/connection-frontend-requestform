import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RequestService } from '../../services/request.service';
import { RequestAnonym } from '../../model/requestanonym';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'answer-request',
    providers: [RequestService],
    templateUrl: './answerrequest.component.html'
})
export class AnswerRequestComponent implements OnInit {
    successMessage: string;
    errorMessage: string;
    voucherId: string;
    wasDeclined: boolean = false;
    actionsEnabled: boolean = false;
    request: RequestAnonym;

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
                this.loadRequest();
                this.ifDeclineRouteDoDecline();
                this.actionsEnabled = true;
              }
            },
            err => this.checkForErrorResponseAndSetMessage(err.error)
          );
    }

    private loadRequest() {
      this.requestService.getRequestByVoucher(this.voucherId)
        .subscribe(r => this.request = r);
    }

    private checkForErrorResponseAndSetMessage(response: any) : boolean {
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

        if (errmessage == "illegal voucher id") {
          this.errorMessage = "Ungültige Anfrage";
        } else if (errmessage == "voucher was already answered") {
          this.errorMessage = "Anfrage wurde von Ihnen schon beantwortet";
        } else if (errmessage == "request already accepted") {
          this.errorMessage = "Anfrage wurde bereits von jemandem übernommen";
        } else if (errmessage == "request was canceled") {
          this.errorMessage = "Anfrage wurde storniert";
        } else if (errmessage == "request is finished") {
          this.errorMessage = "Anfrage ist abgeschlossen";
        } else {
          this.errorMessage = "unbekannter Fehler";
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
          let success = this.checkForErrorResponseAndSetMessage(r);
          if (success) {
            this.successMessage = "Akzeptiert";
          } else {
            this.successMessage = '';
          }
          this.actionsEnabled = false;
        });
    }

    decline() {
      this.requestService.answerVoucherNo(this.voucherId)
        .subscribe(r => {
          this.successMessage = "Abgelehnt";
          this.actionsEnabled = false;
        });
    }
}
