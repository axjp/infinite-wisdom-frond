import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BookI } from '../../../models/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: BookI[] = [];

  constructor(private bookService: BookService, private router: Router) {}

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

  deleteBook(idbook?: string): void {
    if (idbook) {
      this.bookService.deleteBook(idbook).subscribe(
        () => {
          this.findBooks(); // Refresh the book list after deletion
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }

  update(idbook?: string): void {
    if (idbook) {
      this.router.navigate(['/books/form', idbook]);
    }
  }

  navigateToLoanForm(idbook?: string): void {
    if (idbook) {
      this.router.navigate(['/loans/form', idbook]); // Navigate to loan form with book ID
    }
  }
}
