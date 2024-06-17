import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookProductComponent } from './book-product/book-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    BookFormComponent,
    BookListComponent,
    BookProductComponent,
  ],
  imports: [
    PdfViewerModule ,
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }
