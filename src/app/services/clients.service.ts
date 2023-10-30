import { Injectable } from '@angular/core';
import { Client, DataResponseClient, DataResponseDeleteClient, DataResponseSaveOrUpdateClient } from '../Interfaces/clients';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  subject = new BehaviorSubject<DataResponseClient>({
    data:{ clients: [] },message:"",status:""
  });
  subjectEdit = new BehaviorSubject<DataResponseSaveOrUpdateClient>({
    message:"",status:"",data:{ client:
      {"id":-1,"name":"","lastname":"","id_number":"","phone":"","address":""}
    }
  });
  subjectDelete = new BehaviorSubject<DataResponseDeleteClient>({
    data:[] ,message:"",status:""
  });



  private baseUrl = `${enviroment.baseUrl}/api/`;
  private header = {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': `application/json` };

  constructor(
    private http: HttpClient,
    ) { }

  getClients(): Promise<DataResponseClient> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseClient>(`${ this.baseUrl }clients`, { headers:this.header }).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }

  getShowClient(id:number): Promise<DataResponseSaveOrUpdateClient> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseSaveOrUpdateClient>(`${ this.baseUrl }clients/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
        // console.log("Respuesta del servicio",resp);

      });
    })
  }

  postCreateClient(data:Client): Promise<DataResponseSaveOrUpdateClient> {
    return new Promise((resolve,reject)=>{
      this.http.post<DataResponseSaveOrUpdateClient>(`${ this.baseUrl }clients`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  putEditClient(id:number, data:Client): Promise<DataResponseSaveOrUpdateClient> {
    return new Promise((resolve,reject)=>{
      this.http.put<DataResponseSaveOrUpdateClient>(`${ this.baseUrl }clients/${id}`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  deleteClient(id:number): Promise<DataResponseDeleteClient> {
    return new Promise((resolve,reject)=>{
      this.http.delete<DataResponseDeleteClient>(`${ this.baseUrl }clients/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectDelete.next(resp)
        console.log("respuesta de borrar", resp);

        resolve(resp)
      });
    })
  }
}
