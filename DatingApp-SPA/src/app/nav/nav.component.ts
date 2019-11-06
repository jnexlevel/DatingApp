import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public authSvc: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authSvc.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authSvc.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn(): boolean {
    return this.authSvc.loggedIn();
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authSvc.decodedToken = null;
    this.authSvc.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
