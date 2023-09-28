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
    name:      ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    lastname:  ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    id_number: ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    phone:     ['', [ Validators.minLength(7), Validators.maxLength(15)]],
    address:   ['', [Validators.minLength(10), Validators.maxLength(100)]],
    birthday:  [''],
    gender:    ['', [Validators.maxLength(45)]],
    work_position:  ['', [Validators.maxLength(45)]],
    email:          ['', [Validators.email]],
    // role_id:,
    // "url_image":null,
  })

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    ) {
      this.data = this.usersService.subject.subscribe(resp=>{
        this.dataUsers = resp;
      });

  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  get name()       { return this.editUserForm.controls.name; }
  get lastname()   { return this.editUserForm.controls.lastname; }
  get id_number()  { return this.editUserForm.controls.id_number; }
  get phone()      { return this.editUserForm.controls.phone; }
  get address()    { return this.editUserForm.controls.address; }
  get birthday()   { return this.editUserForm.controls.birthday; }
  get gender()     { return this.editUserForm.controls.gender; }
  get email()      { return this.editUserForm.controls.email; }
  get work_position() { return this.editUserForm.controls.work_position; }

  async getAllUsers() {
    this.dataUsers = await this.usersService.getUsers();
  }

  async showUserModal(id:number) {
    this.showUser = await this.usersService.getShowUser(id);
    console.log("showUser",this.showUser.data.user);
  }

  async setEditUserModal(id: number) {
    this.showUser = await this.usersService.getShowUser(id);
    console.log(id);

    this.editUserForm.controls['name'].setValue(this.showUser.data.user.name);
    this.editUserForm.controls['lastname'].setValue(this.showUser.data.user.lastname);
    this.editUserForm.controls['id_number'].setValue(this.showUser.data.user.id_number);
    this.editUserForm.controls['phone'].setValue(this.showUser.data.user.phone);
    this.editUserForm.controls['address'].setValue(this.showUser.data.user.address);
    this.editUserForm.controls['birthday'].setValue(this.showUser.data.user.birthday);
    this.editUserForm.controls['gender'].setValue(this.showUser.data.user.gender);
    this.editUserForm.controls['email'].setValue(this.showUser.data.user.email);
    this.editUserForm.controls['work_position'].setValue(this.showUser.data.user.work_position);
  }

  async editUserModal(id:number) {
    if (this.editUserForm.valid) {
      this.editUser = await this.usersService.putEditUser(id, this.editUserForm.value as User);
    }else{
      this.editUserForm.markAllAsTouched();
    }
  }

  deleteUserModal(id:number) {
    console.log("DELETEid",id);

  }
}
