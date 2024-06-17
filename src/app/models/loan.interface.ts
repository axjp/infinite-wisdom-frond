import { BookI } from './book.interface';

export interface LoanI {
  idloan?: string;
  loanDate?: Date;
  returnDate?: number;
  email?: string;
  state?: boolean;
  book?: BookI;
}
