import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated().then(result => this.shouldProceed(result, next));
  }

  shouldProceed(isAuthenticated: boolean, next: ActivatedRouteSnapshot){
    if(!isAuthenticated){//Anywhere except login and isn't authenticated
      this.auth.redirectToLogin();
    }
    return isAuthenticated;
  }
}
