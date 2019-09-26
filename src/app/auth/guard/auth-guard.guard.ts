import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import {map} from 'rxjs/operators';
import 'rxjs/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.authState$.pipe(map(auth => {
      if(auth == null){
        this.router.navigate(['']);
        return false;
      } else{
        // console.log(auth);
        return true;
      }
    }))
  }
}
