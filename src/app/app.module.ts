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
import { RequestformComponent } from './modules/requestform/requestform.component';
import { UrlInterceptor } from './util/urlinterceptor';

import { I18nService } from './services/i18n.service';
import { AppRoutingModule } from './app-routing.module';
import { AnswerRequestComponent } from './modules/answerrequest/answerrequest.component';
import { CancelRequestComponent } from './modules/cancelrequest/cancelrequest.component';
import { FeedbackVolunteerComponent } from './modules/feedbackvolunteer/feedbackvolunteer.component';
import { FeedbackRequesterComponent } from './modules/feedbackrequester/feedbackrequester.component';
import { SummaryComponent } from './shared/components/summary/summary.component';
import { SummaryAnonymComponent } from './shared/components/summaryanonym/summaryanonym.component';

import { LanguageService } from './services/language.service';

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
    I18nService,
    LanguageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
  ],
  declarations: [
    AppComponent,
    RequestformComponent,
    AnswerRequestComponent,
    CancelRequestComponent,
    SummaryComponent, 
    SummaryAnonymComponent, 
    FeedbackVolunteerComponent, 
    FeedbackRequesterComponent],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
