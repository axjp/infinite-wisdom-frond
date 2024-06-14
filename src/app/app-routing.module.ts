import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'books',
    loadChildren: () => import('./pages/book/book.module').then(m => m.BookModule),
  },
  {
    path: 'common',
    loadChildren: () => import('./common/common.module').then(m => m.CommonModule)
  },
  {
    path: 'administrators',
    loadChildren: () => import('./pages/administrator/administrator.module').then(m => m.AdministratorModule),
  },
  {
    path: 'reviews',
    loadChildren: () => import('./pages/reviews/reviews.module').then(m => m.ReviewsModule),
  },
  {
    path: '**', redirectTo: 'common/not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
