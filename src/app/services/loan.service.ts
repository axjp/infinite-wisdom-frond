import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoanI } from '../models/loan.interface';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private API_URL = environment.API_URL + 'loans/';

  constructor(private http: HttpClient) {}

  createLoan(loan: LoanI): Observable<LoanI> {
    return this.http.post<LoanI>(this.API_URL, loan);
  }

  findLoans(): Observable<LoanI[]> {
    return this.http.get<LoanI[]>(this.API_URL);
  }

  deleteLoan(idloan: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}${idloan}`);
  }
}
