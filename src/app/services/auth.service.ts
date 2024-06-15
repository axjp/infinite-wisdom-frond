import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { AuthResponseI } from "../models/auth-response.interface";
import { AuthRequestI } from "../models/auth-request.interface";
import { AdministratorI } from "../models/administrator.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getProfile() {
    throw new Error('Method not implemented.');
  }
  private readonly httpClient = inject(HttpClient);
  private API_URL_AUTH = `${environment.API_URL}/auth`;

  login(payload: AuthRequestI): Observable<AuthResponseI> {
    return this.httpClient.post<AuthResponseI>(`${this.API_URL_AUTH}/login`, payload);
  }

  register(payload: AdministratorI): Observable<AuthResponseI> {
    return this.httpClient.post<AuthResponseI>(`${this.API_URL_AUTH}/register`, payload);
  }

  refreshToken(token: string): Observable<AuthResponseI> {
    return this.httpClient.post<AuthResponseI>(`${this.API_URL_AUTH}/refresh-token`, { token });
  }
}
