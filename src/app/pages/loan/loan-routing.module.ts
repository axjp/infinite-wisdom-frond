import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanComponent } from './loan/loan.component';

const routes: Routes = [
<<<<<<< HEAD
  { path: 'loans-list', component: LoanListComponent },
  { path: 'loans', component: LoanComponent },
=======
  { path: 'loan-list', component: LoanListComponent },
  { path: 'loan', component: LoanComponent },
>>>>>>> 473ef9d7c56c968cb96d041ca2e4538f71bb7f79
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
