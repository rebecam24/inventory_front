import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interfaces/users';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  userLoginOn: boolean = false;
  userData?: User

  constructor(private loginService:LoginService) {}


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
