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
  loanForm: FormGroup;
  todayDate: string = new Date().toISOString().split('T')[0];
  idbook: string | null = null;
  showAlert: boolean = false;

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
    this.route.paramMap.subscribe(params => {
      this.idbook = params.get('idbook');
      console.log('Book ID:', this.idbook);
    });
  }

  onSubmit(): void {
    if (this.loanForm.valid) {
      const newLoan: LoanI = {
        loanDate: new Date(this.loanForm.value.loan_date),
        returnDate: +this.loanForm.value.return_date,
        email: this.loanForm.value.email,
        state: !!this.loanForm.value.state,
        idbook: this.idbook || '' // Incluye idbook en el préstamo
      };

      this.loanService.createLoan(newLoan).subscribe(
        () => {
          this.loanForm.reset();
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
        },
        (error) => {
          console.error('Error creating loan:', error);
        }
      );
    }
  }

  isReturnDateInvalid(): boolean {
    const returnDateControl = this.loanForm.get('return_date');
    return !!returnDateControl && returnDateControl?.touched && returnDateControl.invalid;
  }
}
