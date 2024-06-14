import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../services/loan.service';
import { LoanI } from '../../../models/loan.interface';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loans: LoanI[] = [];
  errorFetchingLoans = false;
  errorDeletingLoan = false;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.loanService.findLoans().subscribe(
      (response: LoanI[]) => {
        this.loans = response;
        this.errorFetchingLoans = false;
      },
      (error) => {
        console.error('Error fetching loans:', error);
        this.errorFetchingLoans = true;
      }
    );
  }

  deleteLoan(idloan?: string): void {
    if (idloan) {
      this.loanService.deleteLoan(idloan).subscribe(
        () => {
          this.fetchLoans();  // Refrescar la lista después de eliminar
          this.errorDeletingLoan = false;
        },
        (error) => {
          console.error('Error deleting loan:', error);
          this.errorDeletingLoan = true;
        }
      );
    }
  }
}
