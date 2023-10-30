import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataResponseProvider, DataResponseSaveOrUpdateProvider, Provider } from 'src/app/Interfaces/providers';
import { LoginService } from 'src/app/services/auth/login.service';
import { ProvidersService } from 'src/app/services/providers.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent {

  public dataProviders: DataResponseProvider= { data:{ providers: [] },message:"",status:"" };
  public showProvider: DataResponseSaveOrUpdateProvider = { status:"", message:"", data:{ provider: {"id":-1,"name":"","lastname":"", "id_number": -1, "address":"", "phone": "", "email": "", "description": "" } } };
  public editProvider?: DataResponseSaveOrUpdateProvider;
  public data: any;
  public idDelete: number = -1;
  public nameDelete: string = '';
  sidebarExpanded = true;
  userLoginOn: boolean = false;


  editProviderForm = this.formBuilder.group({
    name:        ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    lastname:    ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    id_number:   [-1, [ Validators.minLength(3), Validators.maxLength(45)]],
    phone:       ['', [ Validators.minLength(7), Validators.maxLength(15)]],
    address:     ['', [Validators.minLength(10), Validators.maxLength(100)]],
    email:       ['', [Validators.email]],
    description: [''],
  });

  createProviderForm = this.formBuilder.group({
    name:        ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    lastname:    ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    id_number:   [-1, [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    phone:       ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    address:     ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
    email:       ['', [ Validators.required, Validators.email]],
    description: [''],
  });

  constructor(
    private providersService: ProvidersService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) {
      this.data = this.providersService.subject.subscribe(resp=>{
        this.dataProviders = resp;
      });
      this.loginService.userLoginOn.subscribe(resp=>{
        this.userLoginOn =  resp;
        console.log("esta logueado",this.userLoginOn);

      });

  }

  ngOnInit(): void {
    this.getAllProviders();
  }

  get name()         { return this.editProviderForm.controls.name; }
  get lastname()     { return this.editProviderForm.controls.lastname; }
  get id_number()    { return this.editProviderForm.controls.id_number; }
  get address()      { return this.editProviderForm.controls.address; }
  get phone()        { return this.editProviderForm.controls.phone; }
  get email()        { return this.editProviderForm.controls.email; }
  get description()  { return this.editProviderForm.controls.description; }

  async getAllProviders() {
    this.dataProviders = await this.providersService.getProviders();
    console.log("las categorias",this.dataProviders);

  }

  async showProvidersModal(id:number) {
    this.showProvider = await this.providersService.getShowProvider(id);
    console.log("showProvider",this.showProvider.data.provider);
  }

  async createProviderModal() {
    console.log("create Provider", this.createProviderForm);
    if (this.createProviderForm.valid) {
      this.providersService.postCreateProvider(this.createProviderForm.value as Provider)
      .then((resp) => {
        this.editProvider = resp;
        console.log("resp en comp login",resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Categoria completada');
        this.getAllProviders();
        this.createProviderForm.reset();
      });
    }else{
      this.createProviderForm.markAllAsTouched();
    }

  }

    async setEditProvidersModal(id: number) {
    this.showProvider = await this.providersService.getShowProvider(id);
    console.log(id);
    this.editProviderForm.controls['name'].setValue(this.showProvider.data.provider.name);
    this.editProviderForm.controls['lastname'].setValue(this.showProvider.data.provider.lastname);
    this.editProviderForm.controls['id_number'].setValue(this.showProvider.data.provider.id_number);
    this.editProviderForm.controls['address'].setValue(this.showProvider.data.provider.address);
    this.editProviderForm.controls['phone'].setValue(this.showProvider.data.provider.phone);
    this.editProviderForm.controls['email'].setValue(this.showProvider.data.provider.email);
    this.editProviderForm.controls['description'].setValue(this.showProvider.data.provider.description);

  }

  async editProviderModal(id:number) {

    if (this.editProviderForm.valid) {
      this.providersService.putEditProvider(id,this.editProviderForm.value as Provider)
      .then((resp) => {
        this.editProvider = resp;
        console.log("resp en comp login",resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Proveedor completada');
        this.getAllProviders();
        this.editProviderForm.reset();
      });
    }else{
      this.editProviderForm.markAllAsTouched();
    }
  }

  deleteProvidersModal(id:number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;

    console.log("open modal id:",id, " name: ",name);
  }

  delete(id:number){
    console.log("id a borrar:",id);
    this.providersService.deleteProvider(id)
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('Eliminacion de Proveedor completada');
      this.getAllProviders();
    });
  }

}
