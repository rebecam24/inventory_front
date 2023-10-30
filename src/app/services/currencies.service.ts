import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { Currency, DataResponseCurrency, DataResponseDeleteCurrency, DataResponseSaveOrUpdateCurrency } from '../Interfaces/currencies';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {

  subject = new BehaviorSubject<DataResponseCurrency>({
    data:{ currencies: [] },message:"",status:""
  });
  subjectEdit = new BehaviorSubject<DataResponseSaveOrUpdateCurrency>({
    message:"",status:"",data:{ currency:
      {"id":-1,"name":"","rate":-1}
    }
  });
  subjectDelete = new BehaviorSubject<DataResponseDeleteCurrency>({
    data:[] ,message:"",status:""
  });



  private baseUrl = `${enviroment.baseUrl}/api/`;
  private header = {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': `application/json` };

  constructor(
    private http: HttpClient,
    ) { }

  getCurrencies(): Promise<DataResponseCurrency> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseCurrency>(`${ this.baseUrl }currency`, { headers:this.header }).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }

  getShowCurrency(id:number): Promise<DataResponseSaveOrUpdateCurrency> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseSaveOrUpdateCurrency>(`${ this.baseUrl }currency/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
        // console.log("Respuesta del servicio",resp);

      });
    })
  }

  postCreateCurrency(data:Currency): Promise<DataResponseSaveOrUpdateCurrency> {
    return new Promise((resolve,reject)=>{
      this.http.post<DataResponseSaveOrUpdateCurrency>(`${ this.baseUrl }currency`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  putEditCurrency(id:number, data:Currency): Promise<DataResponseSaveOrUpdateCurrency> {
    return new Promise((resolve,reject)=>{
      this.http.put<DataResponseSaveOrUpdateCurrency>(`${ this.baseUrl }currency/${id}`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  deleteCurrency(id:number): Promise<DataResponseDeleteCurrency> {
    return new Promise((resolve,reject)=>{
      this.http.delete<DataResponseDeleteCurrency>(`${ this.baseUrl }currency/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectDelete.next(resp)
        console.log("respuesta de borrar", resp);

        resolve(resp)
      });
    })
  }
}
