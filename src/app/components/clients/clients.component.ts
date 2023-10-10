import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, DataResponseClient, DataResponseSaveOrUpdateClient } from 'src/app/Interfaces/clients';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {


  public dataClients: DataResponseClient = { data:{ clients: [] },message:"",status:"" };
  public showClient: DataResponseSaveOrUpdateClient = { status:"", message:"", data:{ client: {"id":-1,"name":"","lastname":"","id_number":"","phone":"","address":""} } };
  public editClient?: DataResponseSaveOrUpdateClient;
  public data: any;
  public idDelete: number = -1;
  public nameDelete: string = '';
  sidebarExpanded = true;


  editClientForm = this.formBuilder.group({
    name:      ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    lastname:  ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    id_number: ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    phone:     ['', [ Validators.minLength(7), Validators.maxLength(15)]],
    address:   ['', [Validators.minLength(10), Validators.maxLength(100)]],
  });

  createClientForm = this.formBuilder.group({
    name:      ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    lastname:  ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    id_number: ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    phone:     ['', [ Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
    address:   ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
  });

  constructor(
    private clientsService: ClientsService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) {
      this.data = this.clientsService.subject.subscribe(resp=>{
        this.dataClients = resp;
      });

  }

  ngOnInit(): void {
    this.getAllClients();
  }

  get name()       { return this.editClientForm.controls.name; }
  get lastname()   { return this.editClientForm.controls.lastname; }
  get id_number()  { return this.editClientForm.controls.id_number; }
  get phone()      { return this.editClientForm.controls.phone; }
  get address()    { return this.editClientForm.controls.address; }

  async getAllClients() {
    this.dataClients = await this.clientsService.getClients();
  }

  async showClientModal(id:number) {
    this.showClient = await this.clientsService.getShowClient(id);
  }

  async createClientModal() {
    console.log("create Client", this.createClientForm);
    if (this.createClientForm.valid) {
      this.clientsService.postCreateClient(this.createClientForm.value as Client)
      .then((resp) => {
        this.editClient = resp;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Cliente completada');
        this.getAllClients();
        this.createClientForm.reset();
      });
    }else{
      this.createClientForm.markAllAsTouched();
    }

  }

  async setEditClientModal(id: number) {
    this.showClient = await this.clientsService.getShowClient(id);
    console.log(id);
    this.editClientForm.controls['name'].setValue(this.showClient.data.client.name);
    this.editClientForm.controls['lastname'].setValue(this.showClient.data.client.lastname);
    this.editClientForm.controls['id_number'].setValue(this.showClient.data.client.id_number);
    this.editClientForm.controls['phone'].setValue(this.showClient.data.client.phone);
    this.editClientForm.controls['address'].setValue(this.showClient.data.client.address);
  }

  async editClientModal(id:number) {
    if (this.editClientForm.valid) {
      await this.clientsService.putEditClient(id, this.editClientForm.value as Client)
      .then((resp) => {
        this.editClient = resp;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Actualización de Cliente completada');
        this.getAllClients();
        this.createClientForm.reset();
      });
    }else{
      this.createClientForm.markAllAsTouched();
    }
  }

  deleteClientModal(id:number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;
    console.log("open modal id:",id);
  }

  delete(id:number){
    console.log("id a borrar:",id);
    this.clientsService.deleteClient(id)
    .then((resp) => {

      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('Eliminacion de Usuario completada');
      this.getAllClients();
    });
  }
}
