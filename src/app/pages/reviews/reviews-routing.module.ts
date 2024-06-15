import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';

const routes: Routes = [
  { path: 'reviewlist', component: ReviewsListComponent },
  { path: '', component: ReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
