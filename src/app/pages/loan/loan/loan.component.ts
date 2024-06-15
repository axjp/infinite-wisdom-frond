import { Component, OnInit } from '@angular/core';
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

  constructor(private loanService: LoanService, private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      loan_date: ['', Validators.required],
      return_date: ['', [Validators.required, Validators.max(10)]],
      email: ['', [Validators.required, Validators.email]],
      state: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans(): void {
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

      // Agregar el nuevo préstamo a la lista local antes de enviar al servidor
      this.loans.push(newLoan);

      // Enviar el nuevo préstamo al servicio para crearlo en el servidor
      this.loanService.createLoan(newLoan).subscribe(
        () => {
          this.loanForm.reset(); // Reiniciar el formulario después de enviar
        },
        (error) => {
          console.error('Error creating loan:', error);
          // En caso de error, remover el préstamo agregado localmente
          this.loans.pop();
        }
      );
    }
  }

  deleteLoan(idloan?: string): void {
    if (idloan) {
      this.loanService.deleteLoan(idloan).subscribe(
        () => {
          this.fetchLoans(); // Actualizar la lista después de eliminar el préstamo
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
