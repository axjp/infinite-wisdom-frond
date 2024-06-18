import { Component, OnInit, inject } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BookI } from '../../../models/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  protected books: BookI[] = [];
  protected book: BookI = {};
  

  ngOnInit(): void {
    this.findBooks();
  }

  findBooks(): void {
    this.bookService.findBooks().subscribe(
      (response: BookI[]) => {
        this.books = response;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  deleteBook(idbook?:string) {
    this.bookService.deleteBook(idbook!).subscribe(response => {
      console.log(response);
      this.findBooks();
    })
  }


  update(idbook?: string) {
    this.router.navigate(['/books/form', idbook]);
  }

}
