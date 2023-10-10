import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DataResponse, DataResponseSaveOrUpdate, User } from 'src/app/Interfaces/users';
import { UsersService } from '../../services/users.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRole } from 'src/app/Enums/enums';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  public dataUsers: DataResponse = { data:{ users: [] },message:"",status:"" };
  public showUser: DataResponseSaveOrUpdate = { status:"", message:"", data:{ user: {"id":-1,"name":"","lastname":"","id_number":"","email":"","phone":"","address":"","birthday":"","gender":"","role_id":-1,"work_position":"","url_image":null,"created_at":"","updated_at":"", 'deleted_at': "", 'email_verified_at': ""} } };
  public editUser?: DataResponseSaveOrUpdate;
  public data: any;
  public roles: number [] = [UserRole.Administrador,UserRole.Moderador,UserRole.User];
  public idDelete: number = -1;
  public nameDelete: string = '';
  sidebarExpanded = true;


  editUserForm = this.formBuilder.group({
    role_id:   [-1],
    name:      ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    lastname:  ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    id_number: ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    phone:     ['', [ Validators.minLength(7), Validators.maxLength(15)]],
    address:   ['', [Validators.minLength(10), Validators.maxLength(100)]],
    birthday:  [''],
    gender:    ['', [Validators.maxLength(45)]],
    work_position:  ['', [Validators.maxLength(45)]],
    email:          ['', [Validators.email]],

    // "url_image":null,
  });

  createUserForm = this.formBuilder.group({
    role_id:   [-1, [ Validators.required]],
    name:      ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    lastname:  ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    id_number: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    phone:     ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    address:   ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    birthday:  ['', [ Validators.required]],
    email:     ['', [ Validators.required, Validators.email]],
    password:  ['', [Validators.required, Validators.minLength(8)]],
    gender:    ['', [ Validators.required, Validators.maxLength(45)]],
    work_position:  ['', [ Validators.required, Validators.maxLength(45)]],
    // "url_image":null,
  });

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) {
      this.data = this.usersService.subject.subscribe(resp=>{
        this.dataUsers = resp;
      });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngAfterViewInit(): void {

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
    // console.log("showUser",this.showUser.data.user);
  }

  async createUserModal() {
    console.log("create User", this.createUserForm);
    if (this.createUserForm.valid) {
      this.usersService.postCreateUser(this.createUserForm.value as User)
      .then((resp) => {
        this.editUser = resp;
        console.log("resp en comp login",resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Usuario completada');
        this.getAllUsers();
        this.createUserForm.reset();
      });
    }else{
      this.createUserForm.markAllAsTouched();
    }

  }

  async setEditUserModal(id: number) {
    this.showUser = await this.usersService.getShowUser(id);
    console.log(id);
    this.editUserForm.get('role_id')?.setValue(this.showUser.data.user.role_id);
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

  deleteUserModal(id:number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;
    console.log("open modal id:",id);
  }

  delete(id:number){
    console.log("id a borrar:",id);
    this.usersService.deleteUser(id)
    .then((resp) => {

      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('Eliminacion de Usuario completada');
      this.getAllUsers();
    });
  }
}
