import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReviewService {

  private readonly httpClient = inject(HttpClient);
  private API_URL_REVIEW = `${environment.API_URL}reviews`;

  getReviews(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(this.API_URL_REVIEW);
  }

  createReview(payload: Review): Observable<Review> {
    return this.httpClient.post<Review>(this.API_URL_REVIEW, payload);
  }

  updateReview(id: string, payload: Review): Observable<Review> {
    return this.httpClient.put<Review>(`${this.API_URL_REVIEW}/${id}`, payload);
  }

  deleteReview(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL_REVIEW}/${id}`);
  }

  findOneReview(id: string): Observable<Review> {
    return this.httpClient.get<Review>(`${this.API_URL_REVIEW}/${id}`);
  }
}
