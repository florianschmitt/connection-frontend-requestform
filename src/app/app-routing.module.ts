import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestFormComponent } from './request-form.component';
import { AnswerRequestComponent } from './modules/answerrequest/answerrequest.component';

const routes: Routes = [
    { path: '', component: RequestFormComponent },
    { path: 'request', component: RequestFormComponent },
    { path: 'answerrequest/:id', component: AnswerRequestComponent },
    { path: 'answerrequest/:id/decline', component: AnswerRequestComponent },

//    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
