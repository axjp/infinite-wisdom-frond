import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanI } from '../models/loan.interface';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private apiUrl = 'http://localhost:3000/api/loans/';

  constructor(private http: HttpClient) {}

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
