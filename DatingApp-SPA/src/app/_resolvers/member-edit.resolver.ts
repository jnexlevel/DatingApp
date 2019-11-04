import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(private userSvc: UserService, private router: Router, private alertify: AlertifyService, private authSvc: AuthService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userSvc.getUser(+this.authSvc.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error('Problem retreiving your data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
