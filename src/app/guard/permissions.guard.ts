import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})

export class PermissionsGuard implements CanActivate {
  userLoginOn:boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(){

    if (localStorage.getItem("userLoginOn") == "true") {
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }

}
