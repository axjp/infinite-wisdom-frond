import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private API_URL = environment.API_URL + 'review/';
  constructor(private http: HttpClient) {}



  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.API_URL);
  }

  createReview(review : Review): Observable<Review> {
    return this.http.post<Review>(this.API_URL, review);
  }

  updateReview(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.API_URL}/${id}`, review);
  }

  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  findOneReview(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.API_URL}/${id}`);
  }
}
