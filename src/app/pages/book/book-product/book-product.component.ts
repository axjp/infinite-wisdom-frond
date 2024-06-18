import { Component, Input, OnInit, Inject } from '@angular/core';
import { BookI } from '../../../models/book.interface';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-product',
  templateUrl: './book-product.component.html',
  styleUrls: ['./book-product.component.scss']
})
export class BookProductComponent implements OnInit {
  @Input() book!: BookI;
  idbook: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
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
