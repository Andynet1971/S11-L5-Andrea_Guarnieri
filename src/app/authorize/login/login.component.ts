import { Component } from '@angular/core';
import { iAuthData } from '../../Models/i-auth-data';
import { AuthorizeService } from '../authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authData: iAuthData = {
    email: '',
    password: '',
  };

  constructor(private authSvc: AuthorizeService, private router: Router) {}

  login() {
    this.authSvc.login(this.authData).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
