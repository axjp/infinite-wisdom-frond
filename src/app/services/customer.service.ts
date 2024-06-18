import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CustomerI } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly httpClient = inject(HttpClient);
  private readonly API_URL_CUSTOMER = `${environment.API_URL}customers`; 

  findCustomers(): Observable<CustomerI[]> {
    return this.httpClient.get<CustomerI[]>(this.API_URL_CUSTOMER);
  }

  findoOneCustomer(id: string): Observable<CustomerI> {
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid UUID format');
    }
    return this.httpClient.get<CustomerI>(`${this.API_URL_CUSTOMER}/${id}`);
  }

  createCustomer(payload: CustomerI){
     return this.httpClient.post(this.API_URL_CUSTOMER, payload);
    }
    
  updateCustomer(id: string, updateCustomer: CustomerI): Observable<CustomerI> {
       if (!this.isValidUUID(id)) {
        throw new Error('Invalid UUID format');
       }
      return this.httpClient.put<CustomerI>(`${this.API_URL_CUSTOMER}/${id}`, updateCustomer);
     }

  deleteCustomer(id: string){
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid UUID format');
    }
    return this.httpClient.delete<void>(`${this.API_URL_CUSTOMER}/${id}`);}

  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);

  }
 
}
