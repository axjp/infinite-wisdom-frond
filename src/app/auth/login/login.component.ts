/*
import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  constructor() {
    this.login();
  }

  login() {
    this.authService.login({username: 'cmtl', password: '1234'}).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  getProfile() {
    this.authService.getProfile().subscribe();
  }
}
*/
