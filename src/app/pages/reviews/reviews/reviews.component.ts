import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup;
  editingReviewId: string | null;
  successMessage: string | null;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) {
    this.reviewForm = this.fb.group({
      reviewComment: ['', Validators.required],
      reviewRating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      reviewDate: ['', Validators.required],
      isApproved: [false, Validators.required]
    });
    this.editingReviewId = null;
    this.successMessage = null;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const editReviewId = params['editReviewId'];
      if (editReviewId) {
        this.editReview(editReviewId);
      }
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const formData = this.reviewForm.value;
      if (this.editingReviewId) {
        this.reviewService.updateReview(this.editingReviewId, formData).subscribe(
          updatedReview => {
            console.log('Review updated successfully:', updatedReview);
            this.resetForm();
          },
          error => {
            console.error('Error updating review:', error);
          }
        );
      } else {
        this.reviewService.createReview(formData).subscribe(
          newReview => {
            console.log('Review created successfully:', newReview);
            this.successMessage = 'Review created successfully!';
            this.resetForm();
            setTimeout(() => this.successMessage = null, 3000);
          },
          error => {
            console.error('Error creating review:', error);
          }
        );
      }
    }
  }

  editReview(id: string): void {
    this.reviewService.getReview(id).subscribe(
      review => {
        this.editingReviewId = review.idreview;
        this.reviewForm.patchValue({
          reviewComment: review.reviewComment,
          reviewRating: review.reviewRating,
          reviewDate: review.reviewDate,
          isApproved: review.isApproved
        });
      },
      error => {
        console.error('Error fetching review for editing:', error);
      }
    );
  }

  resetForm(): void {
    this.reviewForm.reset({
      reviewRating: 0,
      isApproved: false
    });
    this.editingReviewId = null;
  }
}
