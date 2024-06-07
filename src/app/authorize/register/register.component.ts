import { Component } from '@angular/core';
import { iUser } from '../../Models/i-user';
import { AuthorizeService } from '../authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  newUser: Partial<iUser> = {};

  constructor(private authSvc: AuthorizeService, private router: Router) {}

  register() {
    this.authSvc.register(this.newUser).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
