import { Component, inject } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BookI } from '../../../models/book.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  private readonly bookService = inject(BookService);
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

  createBook() {
    this.bookService.createBook({}).subscribe(response => {
      console.log(response);
    })
  }

  updateBook() {
    this.bookService.updateBook('1', {}).subscribe(response => {
      console.log(response);
    })
  }

  deleteBook() {
    this.bookService.deleteBook('1').subscribe(response => {
      console.log(response);
    })
  }

  findOneBook(idbook: string) {
    this.bookService.findOneBook(idbook).subscribe(response => {
      this.book = response;
    });
  }

}
