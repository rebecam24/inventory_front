import { Injectable } from '@angular/core';
import { DataResponseDeleteProduct, DataResponseProduct, DataResponseSaveOrUpdateProduct, Product } from '../Interfaces/products';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  subject = new BehaviorSubject<DataResponseProduct>({
    data:{ products: [] },message:"",status:""
  });
  subjectEdit = new BehaviorSubject<DataResponseSaveOrUpdateProduct>({
    message:"",status:"",data:{ product:
      {"id":-1,"name":"","price":-1,"quantity_available": -1,"IVA": -1, "category_id": -1, "provider_id": -1, "category": "", "provider": "" }
    }
  });
  subjectDelete = new BehaviorSubject<DataResponseDeleteProduct>({
    data:[] ,message:"",status:""
  });



  private baseUrl = `${enviroment.baseUrl}/api/`;
  private header = {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': `application/json` };

  constructor(
    private http: HttpClient,
    ) { }

  getProducts(): Promise<DataResponseProduct> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseProduct>(`${ this.baseUrl }products`, { headers:this.header }).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }

  getShowProduct(id:number): Promise<DataResponseSaveOrUpdateProduct> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseSaveOrUpdateProduct>(`${ this.baseUrl }products/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
        // console.log("Respuesta del servicio",resp);

      });
    })
  }

  postCreateProduct(data:Product): Promise<DataResponseSaveOrUpdateProduct> {
    return new Promise((resolve,reject)=>{
      this.http.post<DataResponseSaveOrUpdateProduct>(`${ this.baseUrl }products`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  putEditProduct(id:number, data:Product): Promise<DataResponseSaveOrUpdateProduct> {
    return new Promise((resolve,reject)=>{
      this.http.put<DataResponseSaveOrUpdateProduct>(`${ this.baseUrl }products/${id}`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  deleteProduct(id:number): Promise<DataResponseDeleteProduct> {
    return new Promise((resolve,reject)=>{
      this.http.delete<DataResponseDeleteProduct>(`${ this.baseUrl }products/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectDelete.next(resp)
        console.log("respuesta de borrar", resp);

        resolve(resp)
      });
    })
  }

}

