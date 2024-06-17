import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanComponent } from './loan/loan.component';

const routes: Routes = [
  { path: 'list', component: LoanListComponent },
  { path: 'form/:idbook', component: LoanComponent }, // Acepta idbook como parámetro
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoanRoutingModule { }
