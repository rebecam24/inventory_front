import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/Interfaces/login';
import { LoginResponse } from 'src/app/Interfaces/users';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  public data: LoginResponse = {
    data:{ token: "", user: {id: -1,
                              name: "",
                              email: "",
                              email_verified_at: "",
                              created_at: "",
                              updated_at: "",
                              address: "",
                              birthday: "",
                              deleted_at: "",
                              gender: "",
                              id_number: "",
                              lastname: "",
                              phone: "",
                              role_id: -1,
                              url_image: "",
                              work_position: ""} },message:"",status:""
  }
  loginForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private loginService: LoginService
  ) {  }

  ngOnInit(): void{

  }

  get email() { return this.loginForm.controls.email; }
  get password() { return this.loginForm.controls.password; }

  login() {

    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Login completado');
        this.router.navigateByUrl('/users');
        this.loginForm.reset();
      });
    }else{
      this.loginForm.markAllAsTouched();
    }
  }
}
