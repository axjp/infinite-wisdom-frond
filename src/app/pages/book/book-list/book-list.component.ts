import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { BookI } from '../../../models/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
<<<<<<< HEAD
export class BookListComponent {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  protected books: BookI[] = [];
  protected book: BookI = {};
  
=======
export class BookListComponent implements OnInit {
  books: BookI[] = [];

  constructor(private bookService: BookService, private router: Router) {}
>>>>>>> 5a318b7378c12b4fc6e912045e1ee3ea2c836fe0

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

  navigateToLoanForm(idbook?: string): void {
    if (idbook) {
      this.router.navigate(['/loans/form', idbook]); // Navigate to loan form with book ID
    }
  }
}
