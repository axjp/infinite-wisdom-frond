import { BookI } from './book.interface';

export interface LoanI {
  idloan?: string;
  loanDate: Date;
  returnDate: number;
  email: string;
  state: boolean;
  idbook: string; // Añadido anteriormente
  book?: BookI; // Añadir esta línea
}
