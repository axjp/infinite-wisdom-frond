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
  private readonly API_URL_ADMINISTRATOR = `${environment.API_URL}administrators`;

  // Obtener todos los administradores
  findAdministrators(): Observable<AdministratorI[]> {
    return this.httpClient.get<AdministratorI[]>(this.API_URL_ADMINISTRATOR);
  }
  // Crear un nuevo administrador
  createAdministrator(payload: AdministratorI): Observable<AdministratorI> {
    return this.httpClient.post<AdministratorI>(this.API_URL_ADMINISTRATOR, payload);
  }
  // Actualizar un administrador existente
  updateAdministrator(id: string, payload: AdministratorI): Observable<AdministratorI> {
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid UUID format');
    }
    return this.httpClient.put<AdministratorI>(`${this.API_URL_ADMINISTRATOR}/${id}`, payload);
  }
  // Eliminar un administrador
  deleteAdministrator(id: string): Observable<void> {
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid UUID format');
    }
    return this.httpClient.delete<void>(`${this.API_URL_ADMINISTRATOR}/${id}`);
  }
  // Obtener un solo administrador por ID
  findAdministratorOne(id: string): Observable<AdministratorI> {
    if (!this.isValidUUID(id)) {
      throw new Error('Invalid UUID format');
    }
    return this.httpClient.get<AdministratorI>(`${this.API_URL_ADMINISTRATOR}/${id}`);
  }
    // Método de registro administrador
  register(formData: any): Observable<any> {
    const registerUrl = `${environment.API_URL}register`;
    return this.httpClient.post(this.API_URL_ADMINISTRATOR, formData);
  }
  // Método para validar UUID
  private isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);

  }
}
