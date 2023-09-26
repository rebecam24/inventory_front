import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{
  userLoginOn: boolean = false;

  constructor(
    private loginService:LoginService,
    private router:Router
    ) {  }

  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
    this.loginService.currentUserData.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn)=>{
          this.userLoginOn = userLoginOn;
        }
      }
    )
  }

  logout(){
    this.loginService.logout();
    this.router.navigate(['/login']);
    this.userLoginOn = false;
  }

}
