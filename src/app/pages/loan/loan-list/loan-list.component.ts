import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../../services/loan.service';
import { LoanI } from '../../../models/loan.interface';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {
  loans: LoanI[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.getLoans(); // Al inicializar el componente, obtiene la lista de préstamos
  }

  getLoans(): void {
    // Llama al servicio para obtener la lista de préstamos
    this.loanService.findLoans().subscribe(
      (response: LoanI[]) => {
        this.loans = response.filter(loan => loan.state); // Filtra solo los préstamos activos
      },
      (error) => {
        console.error('Error fetching loans:', error);
      }
    );
  }

  deleteLoan(idloan?: string): void {
    // Elimina un préstamo por su ID específico
    if (idloan) {
      this.loanService.deleteLoan(idloan).subscribe(
        () => {
          this.loans = this.loans.filter(loan => loan.idloan !== idloan); // Actualiza la lista después de eliminar el préstamo
        },
        (error) => {
          console.error('Error deleting loan:', error);
        }
      );
    }
  }
}
