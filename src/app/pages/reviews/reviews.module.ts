import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsComponent } from './reviews/reviews.component';

@NgModule({
  declarations: [
    ReviewsComponent,
    ReviewsListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    ReviewsRoutingModule
  ],
  exports:[ReviewsListComponent]
})
export class ReviewsModule { }
