import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/enviroment';
import { DataResponse, User } from '../Interfaces/users';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  subject = new BehaviorSubject<DataResponse>({
    data:{ users: [] },message:"",status:""
  });

  private baseUrl = `${enviroment.baseUrl}/api/`;

  constructor( private http: HttpClient ) { }

  getUsers(): Promise<DataResponse> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponse>(`${ this.baseUrl }users`).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }
}
