import { HttpClient } from "@angular/common/http";
import { AuthResponseI } from "../models/auth-response.interface";
import { AuthRequestI } from "../models/auth-request.interface";
import { ProfileI } from "../models/profile.interface";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private API_URL_AUTH = `${environment.API_URL}/auth`;
  private token: string | null = null;

  login(payload: AuthRequestI): Observable<AuthResponseI> {
    return this.httpClient.post<AuthResponseI>(`${this.API_URL_AUTH}/logins`, payload).pipe(
      tap(response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
      })
    );
  }

  getProfile(): Observable<ProfileI> {
    return this.httpClient.get<ProfileI>(`${this.API_URL_AUTH}/logins`);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
