import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerformComponent } from './customerform/customerform.component';
import { CustomersService } from '../../services/customer.service';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerformComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule
  ],
  providers:[CustomersService]
})
export class CustomerModule { }
