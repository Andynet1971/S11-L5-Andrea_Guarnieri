import { Component } from '@angular/core';
import { AuthorizeService } from '../../authorize/authorize.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isCollapsed = true;

  isLoggedIn: boolean = false;

  constructor(private authSvc: AuthorizeService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }
  logout() {
    this.authSvc.logout();
  }
}
