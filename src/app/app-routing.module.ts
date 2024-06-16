import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ProtectedComponent } from './pages/protected/protected.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'books',
    loadChildren: () => import('./pages/book/book.module').then(m => m.BookModule),
  },
  {
    path: 'common',
    loadChildren: () => import('./common/common.module').then(m => m.CommonModule)
  },
  {path: 'customer',
    loadChildren: () => import('./pages/customer/customer.module').then(m => m.CustomerModule)
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
    path:'loans',
    loadChildren:() => import('./pages/loan/loan.module').then(m=>m.LoanModule)
  },
 /* {
    path: '**', redirectTo: 'common/not-found'
  },*/
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: ProtectedComponent },
  { path: '**', redirectTo: 'login' } // Redirigir a login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
