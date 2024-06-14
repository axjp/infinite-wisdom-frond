import { Component } from '@angular/core';
import { CustomersService } from '../../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
  customers: any[] = [];

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.customersService.getCustomers().subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.error('Error fetching reviews', error);
      }
    );
  }
}
