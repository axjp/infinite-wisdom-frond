import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';

export const routes: Routes = [
  { path: 'reviewlist', component: ReviewsListComponent },
  { path: 'reviewform', component: ReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
