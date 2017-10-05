import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modUrl : string = this.setupUrl(req.url);
    const secureReq = req.clone({url: modUrl});
    return next.handle(secureReq);
  }

  private setupUrl(applicationUrl: string) : string {
    if (applicationUrl != null && applicationUrl.match(/assets/)) {
      if (environment.production) {
        return 'https://connection-koeln.herokuapp.com/ui' + applicationUrl;
      } else {
        return applicationUrl;
      }
    }

    if (environment.production) {
      return 'https://connection-koeln.herokuapp.com/' + applicationUrl;
    } else {
      return 'https://localhost:8443/../' + applicationUrl;
    }
  }
}
