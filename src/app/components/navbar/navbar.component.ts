import { Component } from '@angular/core';
import { AuthorizeService } from '../../authorize/authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isCollapsed = true;

  isLoggedIn: boolean = false;

  constructor(private authSvc: AuthorizeService, private router: Router) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }
  logout() {
    this.authSvc.logout();
    this.router.navigate(['']);
  }
}
