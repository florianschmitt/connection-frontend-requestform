import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  constructor(private env: EnvironmentService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modUrl : string = this.setupUrl(req.url);
    const secureReq = req.clone({url: modUrl});
    return next.handle(secureReq);
  }

  private setupUrl(applicationUrl: string) : string {
    if (applicationUrl != null && applicationUrl.match(/assets/)) {
      if (this.env.isProd()) {
        return 'https://connection-koeln.herokuapp.com/ui' + applicationUrl;
      } else if (this.env.isTesting()) {
        return 'https://florianschmitt.resolve.bar:8443/ui' + applicationUrl;
      } else {
        return applicationUrl;
      }
    }

    if (this.env.isProd()) {
      return 'https://connection-koeln.herokuapp.com/' + applicationUrl;
    } else if (this.env.isTesting()) {
      return 'https://florianschmitt.resolve.bar:8443/' + applicationUrl;
    } else {
      return 'https://localhost:8443/../' + applicationUrl;
    }
  }
}
