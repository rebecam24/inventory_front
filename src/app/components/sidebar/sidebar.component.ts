import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userLoginOn: boolean = false;
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() logOutUser: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => this.toggleSidebar.emit(!this.isExpanded);


  constructor(
    private loginService:LoginService,
    private router:Router
    ) {  }

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
    this.router.navigate(['/home']);
    this.userLoginOn = false;
    this.logOutUser.emit(this.userLoginOn);
    console.log( "sidebar",this.userLoginOn);
  }

}
