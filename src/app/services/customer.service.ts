import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private apiUrl = 'http://localhost:3000/customer'; 

  constructor(private http: HttpClient) { }

  createCustomer(customerData: any): Observable<any> {
    return this.http.post(this.apiUrl, customerData);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}