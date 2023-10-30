import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroments/enviroment';
import { DataResponse, DataResponseDelete, DataResponseSaveOrUpdate, User } from '../Interfaces/users';
import { BehaviorSubject } from 'rxjs';
import { Data } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  subject = new BehaviorSubject<DataResponse>({
    data:{ users: [] },message:"",status:""
  });
  subjectEdit = new BehaviorSubject<DataResponseSaveOrUpdate>({
    message:"",status:"",data:{ user:
      {"id":-1,"name":"","lastname":"","id_number":"","email":"","phone":"","address":"","birthday":"","gender":"","role_id":-1,"work_position":"","url_image":null,"created_at":"","updated_at":"", 'deleted_at': "", 'email_verified_at': ""}
    }
  });
  subjectDelete = new BehaviorSubject<DataResponseDelete>({
    data:[] ,message:"",status:""
  });



  private baseUrl = `${enviroment.baseUrl}/api/`;
  private header = {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': `application/json` };

  constructor(
    private http: HttpClient,
    ) { }

  getUsers(): Promise<DataResponse> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponse>(`${ this.baseUrl }users`, { headers:this.header }).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }

  getShowUser(id:number): Promise<DataResponseSaveOrUpdate> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseSaveOrUpdate>(`${ this.baseUrl }users/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
        // console.log("Respuesta del servicio",resp);

      });
    })
  }

  postCreateUser(data:User): Promise<DataResponseSaveOrUpdate> {
    return new Promise((resolve,reject)=>{
      this.http.post<DataResponseSaveOrUpdate>(`${ this.baseUrl }users`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  putEditUser(id:number, data:User): Promise<DataResponseSaveOrUpdate> {
    return new Promise((resolve,reject)=>{
      this.http.put<DataResponseSaveOrUpdate>(`${ this.baseUrl }users/${id}`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  deleteUser(id:number): Promise<DataResponseDelete> {
    return new Promise((resolve,reject)=>{
      this.http.delete<DataResponseDelete>(`${ this.baseUrl }users/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectDelete.next(resp)
        console.log("respuesta de borrar", resp);

        resolve(resp)
      });
    })
  }

}
