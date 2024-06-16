import { Component, inject } from '@angular/core';
import { AdministratorService } from '../../../services/administrator.service';
import { AdministratorI } from '../../../models/administrator.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.scss'] 
})
export class AdministratorListComponent {
  private readonly administratorService = inject(AdministratorService);
  protected administrators: AdministratorI[] = [];
  protected administrator: AdministratorI = {};
  private readonly router = inject(Router)
  constructor() {
    this.findAdministrators();
    
  }

  findAdministrators() {
    this.administratorService.findAdministrators().subscribe(response => {
      this.administrators = response;
      console.log(this.administrators);
    });
  }

  createAdministrator() {
    this.administratorService.createAdministrator({}).subscribe(response => {
      console.log(response);
    })
  }
  updateAdministrator(idAdministrator?: string) {
    this.router.navigate(['/administrators/form',idAdministrator]);
  }
  deleteAdministrator(idAdministrator?:string) {
    this.administratorService.deleteAdministrator(idAdministrator!).subscribe(response => {
      console.log(response);
      this.findAdministrators();
    })
  }}
