import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { RequestAnonym } from '../../model/requestanonym';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'cancel-request',
  providers: [RequestService],
  templateUrl: './cancelrequest.component.html'
})
export class CancelRequestComponent implements OnInit {
  message: string;
  errorMessage: string;
  requestId: string;
  wasDeclined: boolean = false;
  actionsEnabled: boolean = false;
  request: RequestAnonym;

  constructor(private route: ActivatedRoute, private requestService: RequestService) { }

  ngOnInit() { this.load(); }

  private load() {
    this.route.params
      .subscribe((params: Params) => {
        this.setRequestId(params['id']);
      });
  }

  private setRequestId(requestId: string) {
    this.requestId = requestId;
    this.requestService.getRequest(this.requestId)
      .subscribe(res => {
        this.request = res
        this.actionsEnabled = true;
      }, 
      err => this.checkForErrorResponseAndSetMessage(err.error)
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
      if (errmessage == "illegal request id") {
        this.errorMessage = "Ungültige Anfrage";
      } else if (errmessage == "request was canceled") {
        this.errorMessage = "Anfrage ist bereits storniert";
      } else {
        this.errorMessage = "unbekannter Fehler";
      }
      return false;
    }
    return true;
  }

  cancel() {
    this.requestService.cancelRequest(this.requestId)
      .subscribe((res: HttpResponse<any>) => {
        let success = this.checkForErrorResponseAndSetMessage(res);
        if (success) {
          this.message = "Anfrage storniert";
        }
        this.actionsEnabled = false;
      }, err => {
        this.checkForErrorResponseAndSetMessage(err.error);
        this.actionsEnabled = false;
      });
  }
}
