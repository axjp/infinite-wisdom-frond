import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomersService } from '../../../services/customer.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-customerform',
  templateUrl: './customerform.component.html',
  styleUrls: ['./customerform.component.scss']  // Asegúrate de tener este archivo de estilo si lo estás utilizando
})
export class CustomerformComponent implements OnInit {
  customerform: FormGroup;
  cities: any = []; // Ajusta según el tipo real de tu arreglo
  genders: any = []; // Ajusta según el tipo real de tu arreglo

  constructor(
    private formBuilder: FormBuilder,
    private customersService: CustomersService  // Ajusta el servicio según tu estructura
  ) {
    this.customerform = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastname: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(16)]],
      birthdate: [null, [Validators.required]],
      idgender: [null, [Validators.required]],
      idcity: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      accept: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    // Aquí puedes cargar ciudades y géneros si es necesario al inicio del componente
    this.loadCities(); // Método para cargar ciudades
    this.loadGenders(); // Método para cargar géneros
  }

  onSubmit(): void {
    if (this.customerform.valid) {
      this.customersService.createCustomer(this.customerform.value).subscribe(
        response => {
          console.log('Cliente creado exitosamente!', response);
          // Aquí puedes redirigir al usuario, mostrar un mensaje de éxito, etc.
        },
        error => {
          console.error('Error al crear cliente', error);
          // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
        }
      );
    } else {
      // Marca todos los controles como tocados para mostrar mensajes de error
      this.customerform.markAllAsTouched();
    }
  }

  private loadCities(): void {
    // Aquí cargarías las ciudades desde tu servicio
    // Ejemplo ficticio:
    this.cities = [
      { idcity: 1, city: 'Ciudad 1' },
      { idcity: 2, city: 'Ciudad 2' },
      { idcity: 3, city: 'Ciudad 3' }
    ];
  }

  private loadGenders(): void {
    // Aquí cargarías los géneros desde tu servicio
    // Ejemplo ficticio:
    this.genders = [
      { idgender: 1, gender: 'Masculino' },
      { idgender: 2, gender: 'Femenino' },
      { idgender: 3, gender: 'Otro' }
    ];
  }

  // Getters para acceder fácilmente a los controles del formulario desde la plantilla
  get name() {
    return this.customerform.get('name');
  }

  get lastname() {
    return this.customerform.get('lastname');
  }

  get email() {
    return this.customerform.get('email');
  }

  get password() {
    return this.customerform.get('password');
  }

  get birthdate() {
    return this.customerform.get('birthdate');
  }

  get idgender() {
    return this.customerform.get('idgender');
  }

  get idcity() {
    return this.customerform.get('idcity');
  }

  get phoneNumber() {
    return this.customerform.get('phoneNumber');
  }

  get accept() {
    return this.customerform.get('accept');
  }
}
