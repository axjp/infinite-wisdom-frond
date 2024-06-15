import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../../services/reviews.service';
import { Review } from '../../../models/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {
    this.reviewForm = this.fb.group({
      reviewComment: ['', Validators.required],
      reviewRating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewDate: ['', Validators.required],
      isApproved: [false, Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const newReview: Review = this.reviewForm.value;
      this.reviewService.createReview(newReview).subscribe(
        () => console.log('Review created successfully'),
        (error) => console.error('Error creating review:', error)
      );
    }
  }
}
