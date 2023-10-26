import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataResponseProduct, DataResponseSaveOrUpdateProduct, Product } from 'src/app/Interfaces/products';
import { LoginService } from 'src/app/services/auth/login.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  public dataProducts: DataResponseProduct= { data:{ products: [] },message:"",status:"" };
  public showProduct: DataResponseSaveOrUpdateProduct = { status:"", message:"", data:{ product: {"id":-1,"name":"","price":-1, "quantity_available": -1, "IVA":-1, "category_id": -1, "provider_id": -1, "category": "", "provider": ""  } } };
  public editProduct?: DataResponseSaveOrUpdateProduct;
  public data: any;
  public idDelete: number = -1;
  public nameDelete: string = '';
  sidebarExpanded = true;
  userLoginOn: boolean = false;
  public categories: any;
  public providers: any;


  editProductForm = this.formBuilder.group({
    name:         ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    price:        [-1],
    quantity_available:  [-1],
    IVA:                 [-1],
    category_id:         [-1],
    provider_id:         [-1],
  });

  createProductForm = this.formBuilder.group({
    name:                ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    price:               [-1, [ Validators.required]],
    quantity_available:  [-1, [ Validators.required]],
    IVA:                 [-1, [ Validators.required]],
    category_id:         [-1, [ Validators.required]],
    provider_id:         [-1, [ Validators.required]],

  });

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private providersService: ProvidersService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) {
      this.data = this.productsService.subject.subscribe(resp=>{
        this.dataProducts = resp;
      });
      this.loginService.userLoginOn.subscribe(resp=>{
        this.userLoginOn =  resp;
        console.log("esta logueado",this.userLoginOn);

      });

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.categoriesData();
    this.providersData();
  }

  get name()                  { return this.editProductForm.controls.name; }
  get price()                 { return this.editProductForm.controls.price; }
  get quantity_available()    { return this.editProductForm.controls.quantity_available; }
  get IVA()                   { return this.editProductForm.controls.IVA; }
  get category_id()           { return this.editProductForm.controls.category_id; }
  get provider_id()           { return this.editProductForm.controls.provider_id; }

  async getAllProducts() {
    this.dataProducts = await this.productsService.getProducts();
    console.log("Todos los productos", this.dataProducts);

  }

  async showProductsModal(id:number) {
    this.showProduct = await this.productsService.getShowProduct(id);
    console.log("showProduct",this.showProduct.data.product);
  }

  async createProductModal() {
    console.log("create Product", this.createProductForm);
    if (this.createProductForm.valid) {
      this.productsService.postCreateProduct(this.createProductForm.value as Product)
      .then((resp) => {
        this.editProduct = resp;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Producto completada');
        this.getAllProducts();
        this.createProductForm.reset();
      });
    }else{
      this.createProductForm.markAllAsTouched();
    }

  }

    async setEditProductsModal(id: number) {
    this.showProduct = await this.productsService.getShowProduct(id);
    console.log(id);
    console.log("las categorias", this.categories);
    console.log("El producto",this.showProduct);

    this.editProductForm.controls['name'].setValue(this.showProduct.data.product.name);
    this.editProductForm.controls['price'].setValue(this.showProduct.data.product.price);
    this.editProductForm.controls['quantity_available'].setValue(this.showProduct.data.product.quantity_available);
    this.editProductForm.controls['IVA'].setValue(this.showProduct.data.product.IVA);
    this.editProductForm.controls['category_id'].setValue(this.showProduct.data.product.category_id);
    this.editProductForm.controls['provider_id'].setValue(this.showProduct.data.product.provider_id);

  }

  async editProductModal(id:number) {

    if (this.editProductForm.valid) {
      this.productsService.putEditProduct(id,this.editProductForm.value as Product)
      .then((resp) => {
        this.editProduct = resp;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Actualizacion de Producto completada');
        this.getAllProducts();
        this.editProductForm.reset();
      });
    }else{
      this.editProductForm.markAllAsTouched();
    }
  }

  deleteProductsModal(id:number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;

    console.log("open modal id:",id, " name: ",name);
  }

  delete(id:number) {
    console.log("id a borrar:",id);
    this.productsService.deleteProduct(id)
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('Eliminacion de Producto completada');
      this.getAllProducts();
    });
  }

  async categoriesData() {
    this.categories = await this.categoriesService.getCategories();
    this.categories = this.categories.data.categories;
    console.log("this.categories", this.categories)
  }

  async providersData() {
    this.providers = await this.providersService.getProviders();
    this.providers = this.providers.data.providers;

    console.log("this.providers", this.providers)
  }

}
