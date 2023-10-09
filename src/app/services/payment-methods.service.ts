import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataResponseDeletePayments, DataResponsePayments, DataResponseSaveOrUpdatePayments, Payments } from '../Interfaces/payment-methods';
import { enviroment } from '../../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {

  subject = new BehaviorSubject<DataResponsePayments>({
    data:{ paymentMethods: [] },message:"",status:""
  });
  subjectEdit = new BehaviorSubject<DataResponseSaveOrUpdatePayments>({
    message:"",status:"",data:{ paymentMethod:
      {"id":-1,"type":"",}
    }
  });
  subjectDelete = new BehaviorSubject<DataResponseDeletePayments>({
    data:[] ,message:"",status:""
  });



  private baseUrl = `${enviroment.baseUrl}/api/`;
  private header = {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': `application/json` };

  constructor(
    private http: HttpClient,
    ) { }

  getPayments(): Promise<DataResponsePayments> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponsePayments>(`${ this.baseUrl }payment-methods`, { headers:this.header }).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }

  getShowPayments(id:number): Promise<DataResponseSaveOrUpdatePayments> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseSaveOrUpdatePayments>(`${ this.baseUrl }payment-methods/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
        // console.log("Respuesta del servicio",resp);

      });
    })
  }

  postCreatePayments(data:Payments): Promise<DataResponseSaveOrUpdatePayments> {
    return new Promise((resolve,reject)=>{
      this.http.post<DataResponseSaveOrUpdatePayments>(`${ this.baseUrl }payment-methods`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  putEditPayment(id:number, data:Payments): Promise<DataResponseSaveOrUpdatePayments> {
    return new Promise((resolve,reject)=>{
      this.http.put<DataResponseSaveOrUpdatePayments>(`${ this.baseUrl }payment-methods/${id}`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  deletePayment(id:number): Promise<DataResponseDeletePayments> {
    return new Promise((resolve,reject)=>{
      this.http.delete<DataResponseDeletePayments>(`${ this.baseUrl }payment-methods/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectDelete.next(resp)
        console.log("respuesta de borrar", resp);
        resolve(resp)
      });
    })
  }
}
