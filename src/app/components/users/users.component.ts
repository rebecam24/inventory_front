import { Component } from '@angular/core';
import { DataResponse, DataResponseEdit, User } from 'src/app/Interfaces/users';
import { UsersService } from '../../services/users.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  public dataUsers: DataResponse = { data:{ users: [] },message:"",status:"" };
  public showUser: DataResponseEdit = { status:"", message:"", data:{ user: {"id":-1,"name":"","lastname":"","id_number":"","email":"","phone":"","address":"","birthday":"","gender":"","role_id":-1,"work_position":"","url_image":null,"created_at":"","updated_at":"", 'deleted_at': "", 'email_verified_at': ""} } };
  public editUser?: DataResponseEdit;
  public data: any;

  editUserForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
  })

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    ) {
      this.data = this.usersService.subject.subscribe(resp=>{
        this.dataUsers = resp;
      })
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  get email() { return this.editUserForm.controls.email; }

  async getAllUsers() {
    this.dataUsers = await this.usersService.getUsers();
  }

  async showUserModal(id:number) {
    this.showUser = await this.usersService.getShowUser(id);

    console.log("showUser",this.showUser.data.user);
  }

   async editUserModal(id:number) {
    console.log("EDITid",id);
    this.showUser = await this.usersService.getShowUser(id);
    if (this.editUserForm.valid) {
      this.editUser = await this.usersService.putEditUser(id, this.editUserForm.value as User);
    }

  }

  deleteUserModal(id:number) {
    console.log("DELETEid",id);

  }
}
