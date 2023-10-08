import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../enviroments/enviroment';
import { Category, DataResponseCategory, DataResponseDeleteCategory, DataResponseSaveOrUpdateCategory } from '../Interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  subject = new BehaviorSubject<DataResponseCategory>({
    data:{ categories: [] },message:"",status:""
  });
  subjectEdit = new BehaviorSubject<DataResponseSaveOrUpdateCategory>({
    message:"",status:"",data:{ category:
      {"id":-1,"name":"","description":""}
    }
  });
  subjectDelete = new BehaviorSubject<DataResponseDeleteCategory>({
    data:[] ,message:"",status:""
  });



  private baseUrl = `${enviroment.baseUrl}/api/`;
  private header = {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': `application/json` };

  constructor(
    private http: HttpClient,
    ) { }

  getCategories(): Promise<DataResponseCategory> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseCategory>(`${ this.baseUrl }categories`, { headers:this.header }).subscribe(resp =>{
        this.subject.next(resp)
        resolve(resp)
      });
    })
  }

  getShowCategory(id:number): Promise<DataResponseSaveOrUpdateCategory> {
    return new Promise((resolve,reject)=>{
      this.http.get<DataResponseSaveOrUpdateCategory>(`${ this.baseUrl }categories/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
        // console.log("Respuesta del servicio",resp);

      });
    })
  }

  postCreateCategory(data:Category): Promise<DataResponseSaveOrUpdateCategory> {
    return new Promise((resolve,reject)=>{
      this.http.post<DataResponseSaveOrUpdateCategory>(`${ this.baseUrl }categories`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  putEditCategory(id:number, data:Category): Promise<DataResponseSaveOrUpdateCategory> {
    return new Promise((resolve,reject)=>{
      this.http.put<DataResponseSaveOrUpdateCategory>(`${ this.baseUrl }categories/${id}`, data, { headers:this.header }).subscribe(resp =>{
        this.subjectEdit.next(resp)
        resolve(resp)
      });
    })
  }

  deleteCategory(id:number): Promise<DataResponseDeleteCategory> {
    return new Promise((resolve,reject)=>{
      this.http.delete<DataResponseDeleteCategory>(`${ this.baseUrl }categories/${id}`, { headers:this.header }).subscribe(resp =>{
        this.subjectDelete.next(resp)
        console.log("respuesta de borrar", resp);

        resolve(resp)
      });
    })
  }
}
