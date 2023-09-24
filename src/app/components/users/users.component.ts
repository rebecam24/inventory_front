import { Component } from '@angular/core';
import { DataResponse, User } from 'src/app/Interfaces/users';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public dataUsers: DataResponse = { data:{ users: [] },message:"",status:"" };
  public data: any;

  constructor(
    private usersService: UsersService
    ) {
      this.data = this.usersService.subject.subscribe(resp=>{
        this.dataUsers = resp;
      })
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  async getAllUsers() {
    this.dataUsers = await this.usersService.getUsers();
  }
}
