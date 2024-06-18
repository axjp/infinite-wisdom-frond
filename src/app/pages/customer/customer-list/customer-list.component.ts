import { Component, inject } from '@angular/core';
import { CustomersService } from '../../../services/customer.service';
import { CustomerI } from '../../../models/customer.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  private readonly customerService = inject(CustomersService);
  protected customers: CustomerI[] = [];
  protected customer: CustomerI = {};
  private readonly router = inject(Router)
  constructor() {
    this.findCustomers();
    
  }

  findCustomers() {
    this.customerService.findCustomers().subscribe(response => {
      this.customers = response;
      console.log(this.customers);
    });
  }

  createCustomer() {
    this.customerService.createCustomer({}).subscribe(response => {
      console.log(response);
    })
  }
  updateCustomer(idCustomer?: string) {
    this.router.navigate(['/customer',idCustomer]);
  }
  deleteCustomer(idCustomer?:string) {
    this.customerService.deleteCustomer(idCustomer!).subscribe(response => {
      console.log(response);
      this.findCustomers();
    })
  }
}
