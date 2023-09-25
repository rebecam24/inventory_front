import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/users';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  userLoginOn: boolean = false;
  userData?: User

  constructor(private loginService:LoginService) {}

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
  }

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
  }
}