import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanComponent } from './component/loan.component';

@NgModule({
  declarations: [
    LoanListComponent,
    LoanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class LoanModule { }
