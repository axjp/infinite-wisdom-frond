import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../services/reviews.service';
import { Review } from '../../../models/review.model';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe(
      (reviews) => this.reviews = reviews,
      (error) => console.error('Error fetching reviews', error)
    );
  }

  deleteReview(id: string): void {
    this.reviewService.deleteReview(id).subscribe(
      () => this.reviews = this.reviews.filter(review => review.idreview !== id),
      (error) => console.error('Error deleting review:', error)
    );
  }
}
