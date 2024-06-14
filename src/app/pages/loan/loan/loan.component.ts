import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanService } from '../../../services/loan.service';
import { LoanI } from '../../../models/loan.interface';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent implements OnInit {
  loans: LoanI[] = [];
  loanForm: FormGroup;

  constructor(private loanService: LoanService, private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      loan_date: ['', Validators.required],
      return_date: ['', [Validators.required, Validators.max(10)]],
      email: ['', [Validators.required, Validators.email]],
      state: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getLoans();
  }

  getLoans(): void {
    this.loanService.findLoans().subscribe(
      (response: LoanI[]) => {
        this.loans = response;
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
        state: !!this.loanForm.value.state, // Convertir a booleano asegurando que no sea undefined
      };

      this.loanService.createLoan(newLoan).subscribe(
        () => {
          this.getLoans(); // Actualizar la lista después de crear el préstamo
          this.loanForm.reset(); // Reiniciar el formulario después de enviar
        },
        (error) => {
          console.error('Error creating loan:', error);
        }
      );
    }
  }

  deleteLoan(idloan?: string): void {
    if (idloan) {
      this.loanService.deleteLoan(idloan).subscribe(
        () => {
          this.getLoans(); // Actualizar la lista después de eliminar el préstamo
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

  validateReturnDays(): void {
    const returnDateControl = this.loanForm.get('return_date');
    if (returnDateControl && returnDateControl.value > 10) {
      returnDateControl.setErrors({ max: true });
    } else {
      returnDateControl?.setErrors(null);
    }
  }
}
