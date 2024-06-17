import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanI } from '../models/loan.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = environment.API_URL + '/loans';

  constructor(private http: HttpClient) {
    console.log('API URL:', this.apiUrl);
  }

  findLoans(): Observable<LoanI[]> {
    return this.http.get<LoanI[]>(this.apiUrl);
  }

  createLoan(loan: LoanI): Observable<LoanI> {
    return this.http.post<LoanI>(this.apiUrl, loan);
  }

  deleteLoan(idloan: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${idloan}`);
  }
}
