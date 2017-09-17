import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JsonpModule, RequestOptions } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { RequestFormComponent } from './request-form.component';
import { EnvironmentService } from './util/environment.service';
import { UrlInterceptor } from './util/urlinterceptor';

import { I18n } from './i18n/I18n.service';
import { AppRoutingModule } from './app-routing.module';
import { AnswerRequestComponent } from './modules/answerrequest/answerrequest.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    JsonpModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    EnvironmentService,
    I18n,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
  ],
  declarations: [
    AppComponent,
    RequestFormComponent,
    AnswerRequestComponent],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
