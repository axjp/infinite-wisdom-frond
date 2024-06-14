import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanComponent } from './loan/loan.component';
import { LoanListComponent } from './loan-list/loan-list.component';

const routes: Routes = [
  { path: '', component: LoanComponent },
  { path: 'loanlist', component: LoanListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
