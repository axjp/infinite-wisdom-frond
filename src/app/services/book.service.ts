import {APP_ID, inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { BookI } from "../models/book.interface";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class BookService {
  private readonly httpClient = inject(HttpClient);
  private API_URL_USER = `${environment.API_URL}books`;

  findBooks():Observable<BookI[]> {
    return this.httpClient.get<BookI[]>(this.API_URL_USER);
  }

  createBook(payload: BookI) {
    return this.httpClient.post(this.API_URL_USER, payload);
  }

  updateBook(id: string, payload: BookI):Observable<BookI> {
    return this.httpClient.put<BookI>(`${this.API_URL_USER}/${id}`, payload);
  }

  deleteBook(id: string) {
    return this.httpClient.delete(`${this.API_URL_USER}/${id}`);
  }

  findOneBook(id: string):Observable<BookI> {
    return this.httpClient.get<BookI>(`${this.API_URL_USER}/${id}`);
  }
}
