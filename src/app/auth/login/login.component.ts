import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        console.log('Login successful:', response);
        this.router.navigate(['/protected']);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  getProfile() {
    this.authService.getProfile().subscribe(
      profile => {
        console.log('Profile:', profile);
      },
      error => {
        console.error('Error retrieving profile:', error);
      }
    );
  }
}
