import { Injectable } from '@angular/core';
import { DataResponseDeleteProvider, DataResponseProvider, DataResponseSaveOrUpdateProvider, Provider } from '../Interfaces/providers';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  subject = new BehaviorSubject<DataResponseProvider>({
    data:{ providers: [] },message:"",status:""
  });
  subjectEdit = new BehaviorSubject<DataResponseSaveOrUpdateProvider>({
    message:"",status:"",data:{ provider:
      {"id":-1,"name":"","lastname":"", "id_number": -1, "address":"", "phone": "", "email": "", "description": ""}
    }
  });
  subjectDelete = new BehaviorSubject<DataResponseDeleteProvider>({
    data:[] ,message:"",status:""
  });



  private baseUrl = `${enviroment.baseUrl}/api/`;
  private header = {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': `application/json` };

  constructor(
    private http: HttpClient,
    ) { }

  getProviders(): Promise<DataResponseProvider> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseProvider>(`${ this.baseUrl }providers`, { headers:this.header }).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }

  getShowProvider(id:number): Promise<DataResponseSaveOrUpdateProvider> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseSaveOrUpdateProvider>(`${ this.baseUrl }providers/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
        // console.log("Respuesta del servicio",resp);

      });
    })
  }

  postCreateProvider(data:Provider): Promise<DataResponseSaveOrUpdateProvider> {
    return new Promise((resolve,reject)=>{
      this.http.post<DataResponseSaveOrUpdateProvider>(`${ this.baseUrl }providers`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  putEditProvider(id:number, data:Provider): Promise<DataResponseSaveOrUpdateProvider> {
    return new Promise((resolve,reject)=>{
      this.http.put<DataResponseSaveOrUpdateProvider>(`${ this.baseUrl }providers/${id}`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  deleteProvider(id:number): Promise<DataResponseDeleteProvider> {
    return new Promise((resolve,reject)=>{
      this.http.delete<DataResponseDeleteProvider>(`${ this.baseUrl }providers/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectDelete.next(resp)
        console.log("respuesta de borrar", resp);

        resolve(resp)
      });
    })
  }

}
