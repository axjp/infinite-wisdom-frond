import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/reviews.service';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss']
})
export class ReviewsListComponent implements OnInit {
  reviews: Review[] = [];
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe(
      reviews => {
        this.reviews = reviews;
      },
      error => {
        console.error('Error loading reviews:', error);
      }
    );
  }

  editReview(id: string): void {
    this.router.navigate(['/reviews/reviewform'], { queryParams: { editReviewId: id } });
  }

  deleteReview(id: string): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(id).subscribe({
        next: () => {
          console.log('Review deleted successfully');
          this.loadReviews();
        },
        error: (error) => {
          console.error('Error deleting review:', error);
        }
      });
    }
  }
}
