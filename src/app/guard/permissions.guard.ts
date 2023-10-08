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
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn = userLoginOn;
      }
    });

    if (!this.userLoginOn) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

}
