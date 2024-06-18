import { Component, Input, OnInit, Inject, inject } from '@angular/core';
import { BookI } from '../../../models/book.interface';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-product',
  templateUrl: './book-product.component.html',
  styleUrls: ['./book-product.component.scss']
})
export class BookProductComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private readonly bookService = inject(BookService);
  protected idbook: string='';
  protected book: BookI= {};



  constructor() {


    this.route.params.subscribe(params => {
      this.idbook = params['idbook'];
      if (this.idbook) {
        this.findOneBook(this.idbook);
      }
    });
  }

  findOneBook(idbook: string) {
    this.bookService.findOneBook(idbook).subscribe(response => {
      this.book = response;
    });
  }

}
