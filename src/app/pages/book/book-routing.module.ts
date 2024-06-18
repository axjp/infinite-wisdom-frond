import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookProductComponent } from './book-product/book-product.component';

const routes: Routes = [
  {
    path: 'form',
    component: BookFormComponent
  },
  {
    path: 'list',
    component: BookListComponent
  },
  {
    path: 'form/:idbook',
    component: BookFormComponent
  },
  {
    path: 'product/:idbook',
    component: BookProductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
