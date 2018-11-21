import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestformComponent } from './modules/requestform/requestform.component';
import { AnswerRequestComponent } from './modules/answerrequest/answerrequest.component';
import { CancelRequestComponent } from './modules/cancelrequest/cancelrequest.component';
import { FeedbackVolunteerComponent } from './modules/feedbackvolunteer/feedbackvolunteer.component';
import { FeedbackRequesterComponent } from './modules/feedbackrequester/feedbackrequester.component';

const routes: Routes = [
    { path: '', component: RequestformComponent },
    { path: 'request', component: RequestformComponent },
    { path: 'answerrequest/:id', component: AnswerRequestComponent },
    { path: 'answerrequest/:id/decline', component: AnswerRequestComponent },
    { path: 'cancelrequest/:id', component: CancelRequestComponent },
    { path: 'feedbackrequester/:id', component: FeedbackRequesterComponent },
    { path: 'feedbackvolunteer/:id', component: FeedbackVolunteerComponent },

//    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
