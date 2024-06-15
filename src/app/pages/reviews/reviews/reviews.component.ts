import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ReviewService } from '../../../services/review.service';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService, private formBuilder: FormBuilder) {
    this.reviewForm = this.formBuilder.group({
      reviewRating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewComment: ['', Validators.required],
      reviewDate: [new Date(), Validators.required], // Ensure the backend can handle the date format
      isApproved: [false],
    });
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe({
      next: (reviews) => {
        this.reviews = reviews;
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      this.reviewService.createReview(this.reviewForm.value).subscribe({
        next: (response) => {
          console.log('Review created successfully!', response);
          alert('Review submitted successfully!');
          this.loadReviews(); // Reload reviews after successful creation
        },
        error: (error) => {
          console.error('Error creating review', error);
          alert('Error submitting review');
        }
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
