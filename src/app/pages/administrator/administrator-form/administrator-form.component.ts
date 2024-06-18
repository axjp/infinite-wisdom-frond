import { Component,inject } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdministratorService } from '../../../services/administrator.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AdministratorI } from '../../../models/administrator.interface';

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.scss']
})
export class AdministratorFormComponent {
  protected form: FormGroup;
  private readonly formBuillder=inject( FormBuilder) ; 
  private readonly administratorService =inject(AdministratorService);
  protected idAdministrator:any=null;
  private route: ActivatedRoute = inject(ActivatedRoute);
  protected administrator:AdministratorI={};
  protected isEditMode = false;

  constructor(private router: Router) 
  {
    this.form = this.buildForm;
    this.route.params.subscribe(params => {
      this.idAdministrator = params['idAdministrator'];
      if (this.idAdministrator) {
        this.isEditMode = true;
        this.findAdministratorOne(this.idAdministrator);}});
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

  saveOrUpdate() {
    if (this.form.status === 'VALID') {
      if (this.isEditMode) {
        this.administratorService.updateAdministrator(this.idAdministrator, this.form.value).subscribe(
          response => {
            alert('Cambios guardados con éxito');
            this.router.navigate(['/list']); 
          },
        );
      } else {
        this.administratorService.createAdministrator(this.form.value).subscribe(
          response => {
            alert('Administrador registrado con éxito');
            this.form.reset();
          }
        );
      }
    } else {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos correctamente.');
    }
  }

  findAdministratorOne(idAdministrator: string) {
    this.administratorService.findAdministratorOne(idAdministrator).subscribe(response => {
      this.administrator = response;
      this.form.patchValue(this.administrator);
    });
  }
}