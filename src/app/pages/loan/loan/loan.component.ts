import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../../services/loan.service';
import { LoanI } from '../../../models/loan.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loans: LoanI[] = [];
  loanForm: FormGroup;
  todayDate: string = new Date().toISOString().split('T')[0];
  idbook: string | null = null;

  constructor(
    private loanService: LoanService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.loanForm = this.fb.group({
      loan_date: ['', Validators.required],
      return_date: ['', [Validators.required, Validators.max(10)]],
      email: ['', [Validators.required, Validators.email]],
      state: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchLoans();
    this.route.paramMap.subscribe(params => {
      this.idbook = params.get('idbook');
      console.log('Book ID:', this.idbook); // Verifica el id del libro
    });
  }

  fetchLoans(): void {
    this.loanService.findLoans().subscribe(
      (response: LoanI[]) => {
        this.loans = response.filter(loan => loan.state);
      },
      (error) => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      const newLoan: LoanI = {
        loanDate: new Date(this.loanForm.value.loan_date),
        returnDate: +this.loanForm.value.return_date,
        email: this.loanForm.value.email,
        state: !!this.loanForm.value.state,
      };

      if (newLoan.state) {
        this.loans.push(newLoan);
      }

      this.loanService.createLoan(newLoan).subscribe(
        () => {
          this.loanForm.reset();
        },
        (error) => {
          console.error('Error creating loan:', error);
          if (newLoan.state) {
            this.loans.pop();
          }
        }
      );
    }
  }

  deleteLoan(idloan?: string): void {
    if (idloan) {
      this.loanService.deleteLoan(idloan).subscribe(
        () => {
          this.fetchLoans();
        },
        (error) => {
          console.error('Error deleting loan:', error);
        }
      );
    }
  }

  isReturnDateInvalid(): boolean {
    const returnDateControl = this.loanForm.get('return_date');
    return !!returnDateControl && returnDateControl?.touched && returnDateControl.invalid;
  }
}
