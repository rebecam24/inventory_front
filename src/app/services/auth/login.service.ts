import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/Interfaces/login';
import { enviroment } from '../../../enviroments/enviroment';
import { LoginResponse, User } from '../../Interfaces/users';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  subject = new BehaviorSubject<LoginResponse>({
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
  });

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(localStorage.getItem("userLoginOn")==="true"? true: false);
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));

  private baseUrl = `${enviroment.baseUrl}/api/`;

  constructor(
    private http: HttpClient,
    ) {    }

  login(credentials: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve,reject)=>{
      this.http.post<LoginResponse>(`${ this.baseUrl }login`, credentials).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(resp.data.user);
        localStorage.setItem('currentUser', JSON.stringify(resp.data.user));
        localStorage.setItem('token', resp.data.token);
        reject(this.handleError)
      })
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log("Se ha priducido un error ", error.error);
    } else {
      console.log("Backend retornó el código de estado ", error.status, error.error);
    }

    return throwError(()=> new Error('Algo falló. Por favor intente de nuevo.'));
  }

  get userData():Observable<User> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  logout() {
    //remove user from localStorage
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserData.next({"id":-1,"name":"","lastname":"","id_number":"","email":"","phone":"","address":"","birthday":"","gender":"","role_id":-1,"work_position":"","url_image":null,"created_at":"","updated_at":"", 'deleted_at': "", 'email_verified_at': ""});
    this.currentUserLoginOn.next(false);
  }
}
