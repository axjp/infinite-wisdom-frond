import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanI } from '../models/loan.interface'; // Importa la interfaz LoanI para tipado
import { environment } from '../../environments/environment'; // Importa la configuración de entorno

@Injectable({
  providedIn: 'root' // Servicio proporcionado a nivel de raíz para inyección global
})
export class LoanService {
  private apiUrl = `${environment.API_URL}/loans`; // URL base del API para préstamos

  constructor(private http: HttpClient) {
    console.log('API URL:', this.apiUrl); // Imprime la URL del API en la consola al inicializar el servicio
  }

  // Método para obtener todos los préstamos
  findLoans(): Observable<LoanI[]> {
    return this.http.get<LoanI[]>(this.apiUrl); // Realiza una solicitud GET al API para obtener todos los préstamos
  }

  // Método para crear un nuevo préstamo
  createLoan(loan: LoanI): Observable<LoanI> {
    return this.http.post<LoanI>(this.apiUrl, loan); // Realiza una solicitud POST al API para crear un nuevo préstamo
  }

  // Método para eliminar un préstamo por ID
  deleteLoan(idloan: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idloan}`); // Realiza una solicitud DELETE al API para eliminar un préstamo por su ID
  }
}
