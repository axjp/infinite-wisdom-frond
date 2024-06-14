import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../../models/review.model';
import { ReviewService } from '../../../services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  public review: Review = {
    review_rating: 0,
    review_date: new Date(),
    review_comment: '',
    is_approved: false,
    customer_id: '',
    book_id: ''
  };
  private readonly reviewService: ReviewService = inject(ReviewService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  protected reviewForm: FormGroup;
  protected reviews: Review[] = [];

  constructor() {
    this.reviewForm = this.buildForm;
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  get buildForm() {
    return this.formBuilder.group({
      review_rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      review_date: [new Date(), Validators.required],
      review_comment: ['', Validators.required],
      is_approved: [false],
      customer_id: ['', Validators.required],
      book_id: ['', Validators.required]
    });
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
          alert('Datos enviados');
          this.loadReviews(); // Recargar las reseñas después de la creación exitosa
        },
        error: (error) => {
          console.error('Error creating review', error);
          alert('Error al enviar los datos');
        }
      });
    }
  }
}
