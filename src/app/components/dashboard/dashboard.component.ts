import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Interfaces/users';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  userLoginOn: boolean = false;

  userData?: User
  constructor(private loginService:LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn = userLoginOn;
      }
    });

    this.loginService.currentUserData.subscribe({
      next:(userData)=>{
        this.userData = userData;
      }
    });
    console.log("dashboard",this.userLoginOn);

    if (!this.userLoginOn) {
      console.log("entra al cierre");
      this.router.navigate(["/home"]);
    }
  }
}
