import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookI } from '../../models/book.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  protected books: BookI[] = [];
  protected book: BookI = {};
  

  constructor() {
    this.findBooks();
  }
 findBooks() {
    this.bookService.findBooks().subscribe(response => {
      this.books = response;
      console.log(this.books);
    });
  }

  
  update(idbook?: string) {
    this.router.navigate(['/books/product', idbook]);
  }

  
}

