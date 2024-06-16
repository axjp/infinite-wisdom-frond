import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BookI } from '../../../models/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
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


  deleteBook(idbook?:string) {
    this.bookService.deleteBook(idbook!).subscribe(response => {
      console.log(response);
    })
  }

  
  update(idbook?: string) {
    this.router.navigate(['/books/form', idbook]);
  }

}
