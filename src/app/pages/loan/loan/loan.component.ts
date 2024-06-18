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
    // Inicialización del formulario y validaciones
    this.loanForm = this.fb.group({
      loan_date: ['', Validators.required],
      return_date: ['', [Validators.required, Validators.max(10)]],
      email: ['', [Validators.required, Validators.email]],
      state: [false, Validators.required],
    });
  }

  ngOnInit(): void {
    // Obtención del parámetro idbook de la ruta
    this.route.paramMap.subscribe(params => {
      this.idbook = params.get('idbook');
      console.log('Book ID:', this.idbook);
    });
  }

  onSubmit(): void {
    // Manejo del evento de envío del formulario
    if (this.loanForm.valid) {
      // Creación de un nuevo préstamo basado en los datos del formulario
      const newLoan: LoanI = {
        loanDate: new Date(this.loanForm.value.loan_date),
        returnDate: +this.loanForm.value.return_date,
        email: this.loanForm.value.email,
        state: !!this.loanForm.value.state,
        idbook: this.idbook || '' // Incluye idbook en el préstamo
      };

      // Llamada al servicio para crear el préstamo
      this.loanService.createLoan(newLoan).subscribe(
        () => {
          this.loanForm.reset(); // Reinicia el formulario después de enviar
          this.showAlert = true; // Muestra el mensaje de alerta
          setTimeout(() => {
            this.showAlert = false; // Oculta el mensaje de alerta después de 3 segundos
          }, 3000);
        },
        (error) => {
          console.error('Error creating loan:', error);
        }
      );
    }
  }

  isReturnDateInvalid(): boolean {
    // Verifica si la fecha de retorno es inválida (mayor a 10 días)
    const returnDateControl = this.loanForm.get('return_date');
    return !!returnDateControl && returnDateControl?.touched && returnDateControl.invalid;
  }
}
