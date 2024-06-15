import { Component,inject } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministratorService } from '../../../services/administrator.service'; 

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.scss']
})
export class AdministratorFormComponent {
  protected form: FormGroup;
  private readonly formBuillder=inject( FormBuilder) ; 
  private readonly administratorService =inject(AdministratorService);
  constructor() {
    this.form = this.buildForm;
  }

  get buildForm(): FormGroup {
    return (this.form= this.formBuillder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cellphone: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      birthdate: ['', [Validators.required]],
      state: [false, Validators.requiredTrue]
    }));
  }
  get nameField():AbstractControl{
    return this.form.controls['name'];
  };
  get lastNameField():AbstractControl{
  return this.form.controls['lastName'];
  };
  get emailField():AbstractControl{
  return this.form.controls['email'];
  };
  get passwordField():AbstractControl{
  return this.form.controls['password'];
  };
  get birthdateField():AbstractControl{
    return this.form.controls['birthdate'];
  };
  get cellphoneField():AbstractControl{
    return this.form.controls['cellphone'];
  };
  get stateField():AbstractControl{
    return this.form.controls['state'];
  };

  // Llevar los datos al backend
  save() {
    if (this.form.status === 'VALID') {
      this.administratorService.register(this.form.value).subscribe(
        response => {
          alert('Registro realizado con éxito');
        });
    } else {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
    }
  }
}
