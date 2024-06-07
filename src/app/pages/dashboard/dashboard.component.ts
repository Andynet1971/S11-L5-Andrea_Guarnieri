import { Component } from '@angular/core';
import { AuthorizeService } from '../../authorize/authorize.service';
import { iUser } from '../../Models/i-user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  user!: iUser;

  constructor(private authSvc: AuthorizeService) {}

  ngOnInit() {
    this.authSvc.user$.subscribe((user) => {
      if (user) this.user = user;
    });
  }
}
