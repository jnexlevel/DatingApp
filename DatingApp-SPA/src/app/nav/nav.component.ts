import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private authSvc: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authSvc.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to login');
    });
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut(): void {
    localStorage.removeItem('token');
    console.log('Logged out');
  }

}
