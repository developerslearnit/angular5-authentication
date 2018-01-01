import { AuthService } from './../services/auth.service';
import {
     Router, CanActivate, ActivatedRouteSnapshot,
     RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';
import { SessionStorageService } from 'app/services/sessionstorage.service';

@Injectable()
export class AuthGuard implements CanActivate {
     private canEnter: boolean = false;
     constructor(private router: Router,
     private sessionStorage:SessionStorageService) { }

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
          
          if(this.sessionStorage.getLoggedInUser()){
               return true;
          }
         this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          return false;
     }
}