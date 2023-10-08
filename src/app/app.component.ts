import { Component } from '@angular/core';
import { LoginService } from './services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'inventory_front';
  sidebarExpanded = true;
  userLoginOn: boolean = false;

  constructor(private loginService:LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn)=>{
        this.userLoginOn = userLoginOn;
      }
    });

    console.log( "appComponent",this.userLoginOn);

  }
}
