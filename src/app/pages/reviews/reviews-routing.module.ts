import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewsComponent } from './component/reviews.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';

const routes: Routes = [
  { path: 'reviews', component: ReviewsComponent },
  { path: 'reviews-list', component: ReviewsListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewsRoutingModule { }
