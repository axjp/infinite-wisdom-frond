import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AdministratorI } from "../models/administrator.interface";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  private readonly httpClient = inject(HttpClient);
  private readonly API_URL_ADMINISTRATOR = `${environment.API_URL}/administrators`;

  findAdministrators():Observable<AdministratorI[]> {
    return this.httpClient.get<AdministratorI[]>(this.API_URL_ADMINISTRATOR);
  }

  createAdministrator(payload: AdministratorI) {
    return this.httpClient.post(this.API_URL_ADMINISTRATOR, payload);
  }

  updateAdministrator(idAdministrator: string, payload: AdministratorI):Observable<AdministratorI> {
    return this.httpClient.put<AdministratorI>(`${this.API_URL_ADMINISTRATOR}/${idAdministrator}`, payload);
  }
  deleteAdministrator(idAdministrator: string) {
    return this.httpClient.delete(`${this.API_URL_ADMINISTRATOR}/${idAdministrator}`);
  }

  findAdministratorOne(idAdministrator: string):Observable<AdministratorI> {
    return this.httpClient.get<AdministratorI>(`${this.API_URL_ADMINISTRATOR}/${idAdministrator}`);
  }
  
}
