import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../../services/customer.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerI } from '../../../models/customer.interface';

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss']  
})
export class CustomerformComponent implements OnInit {
  protected customerform: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  private readonly customerService = inject(CustomersService);
  protected idCustomer: any = null;
  protected isEditMode = false;
protected customer: CustomerI={};
  constructor(private route: ActivatedRoute, private router: Router) {
    this.customerform = this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCustomer = params['idCustomer'];
      if (this.idCustomer) {
        this.isEditMode = true;
        this.findoOneCustomer(this.idCustomer);
      }
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      customerUser: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16)]],
      birthday: ['', [Validators.required]],
      idgender: ['', [Validators.required]],
      idcity: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(16)]],
      accept: [false, [Validators.requiredTrue]]
    });
  }

  get nameField(): AbstractControl {
    return this.customerform.get('name')!;
  }

  get lastnameField(): AbstractControl {
    return this.customerform.get('lastname')!;
  }

  get emailField(): AbstractControl {
    return this.customerform.get('email')!;
  }

  get customerUserField(): AbstractControl {
    return this.customerform.get('customerUser')!;
  }

  get passwordField(): AbstractControl {
    return this.customerform.get('password')!;
  }

  get birthdayField(): AbstractControl {
    return this.customerform.get('birthday')!;
  }

  get idgenderField(): AbstractControl {
    return this.customerform.get('idgender')!;
  }

  get idcityField(): AbstractControl {
    return this.customerform.get('idcity')!;
  }

  get cellphoneField(): AbstractControl {
    return this.customerform.get('cellphone')!;
  }

  get acceptField(): AbstractControl {
    return this.customerform.get('accept')!;
  }

  onSubmit(): void {
    if (this.customerform.status === 'VALID') {
      if (this.isEditMode) {
        this.customerService.updateCustomer(this.idCustomer, this.customerform.value).subscribe(
          response => {
            alert('Cambios guardados con éxito');
            this.router.navigate(['']); 
          },
        );
      } else {
        this.customerService.createCustomer(this.customerform.value).subscribe(
          response => {
            alert('Administrador registrado con éxito');
            this.customerform.reset();
          }
        );
      }
    } else {
      this.customerform.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
    }

 
}
findoOneCustomer(idCustomer: string) {
  this.customerService.findoOneCustomer(idCustomer).subscribe(response => {
    this.customer = response;
    this.customerform.patchValue(this.customer);
  });
}}