import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, DataResponseCategory, DataResponseSaveOrUpdateCategory } from 'src/app/Interfaces/categories';
import { LoginService } from 'src/app/services/auth/login.service';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  public dataCategories: DataResponseCategory = { data:{ categories: [] },message:"",status:"" };
  public showCategory: DataResponseSaveOrUpdateCategory = { status:"", message:"", data:{ category: {"id":-1,"name":"","description":""} } };
  public editCategory?: DataResponseSaveOrUpdateCategory;
  public data: any;
  public idDelete: number = -1;
  public nameDelete: string = '';
  sidebarExpanded = true;
  userLoginOn: boolean = false;


  editCategoryForm = this.formBuilder.group({
    name:         ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    description:  ['', [ Validators.minLength(3), Validators.maxLength(45)]],
  });

  createCategoryForm = this.formBuilder.group({
    name:         ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    description:  ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
  });

  constructor(
    private categoriesService: CategoriesService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) {
      this.data = this.categoriesService.subject.subscribe(resp=>{
        this.dataCategories = resp;
      });
      this.loginService.userLoginOn.subscribe(resp=>{
        this.userLoginOn =  resp;
        console.log("esta logueado",this.userLoginOn);

      });

  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  get name()          { return this.editCategoryForm.controls.name; }
  get description()   { return this.editCategoryForm.controls.description; }

  async getAllCategories() {
    this.dataCategories = await this.categoriesService.getCategories();
  }

  async showCategoriesModal(id:number) {
    this.showCategory = await this.categoriesService.getShowCategory(id);
  }

  async createCategoryModal() {
    if (this.createCategoryForm.valid) {
      this.categoriesService.postCreateCategory(this.createCategoryForm.value as Category)
      .then((resp) => {
        this.editCategory = resp;
        console.log("resp en comp login",resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Categoria completada');
        this.getAllCategories();
        this.createCategoryForm.reset();
      });
    }else{
      this.createCategoryForm.markAllAsTouched();
    }

  }

    async setEditCategoriesModal(id: number) {
    this.showCategory = await this.categoriesService.getShowCategory(id);
    console.log(id);
    this.editCategoryForm.controls['name'].setValue(this.showCategory.data.category.name);
    this.editCategoryForm.controls['description'].setValue(this.showCategory.data.category.description);

  }

  async editCategoryModal(id:number) {

    if (this.editCategoryForm.valid) {
      this.categoriesService.putEditCategory(id,this.editCategoryForm.value as Category)
      .then((resp) => {
        this.editCategory = resp;
        console.log("resp en comp login",resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Categoria completada');
        this.getAllCategories();
        this.editCategoryForm.reset();
      });
    }else{
      this.editCategoryForm.markAllAsTouched();
    }
  }

  deleteCategoriesModal(id:number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;

    console.log("open modal id:",id, " name: ",name);
  }

  delete(id:number){
    console.log("id a borrar:",id);
    this.categoriesService.deleteCategory(id)
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('Eliminacion de Usuario completada');
      this.getAllCategories();
    });
  }
}
