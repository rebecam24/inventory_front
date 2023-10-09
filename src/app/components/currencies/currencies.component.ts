import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Currency, DataResponseCurrency, DataResponseSaveOrUpdateCurrency } from 'src/app/Interfaces/currencies';
import { LoginService } from 'src/app/services/auth/login.service';
import { CurrenciesService } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent {

  public dataCurrencies: DataResponseCurrency = { data:{ currencies: [] },message:"",status:"" };
  public showCurrency: DataResponseSaveOrUpdateCurrency = { status:"", message:"", data:{ currency: {"id":-1,"name":"","rate":-1} } };
  public editCurrency?: DataResponseSaveOrUpdateCurrency;
  public data: any;
  public idDelete: number = -1;
  public nameDelete: string = '';
  sidebarExpanded = true;
  userLoginOn: boolean = false;


  editCurrencyForm = this.formBuilder.group({
    name:  ['', [ Validators.minLength(3), Validators.maxLength(45)]],
    rate:  [-1],
  });

  createCurrencyForm = this.formBuilder.group({
    name:  ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
    rate:  [-1, [ Validators.required ]],
  });

  constructor(
    private currenciesService: CurrenciesService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) {
      this.data = this.currenciesService.subject.subscribe(resp=>{
        this.dataCurrencies = resp;
      });
      this.loginService.userLoginOn.subscribe(resp=>{
        this.userLoginOn =  resp;
        console.log("esta logueado",this.userLoginOn);

      });

  }

  ngOnInit(): void {
    this.getAllCurrencies();
  }

  get name()   { return this.editCurrencyForm.controls.name; }
  get rate()   { return this.editCurrencyForm.controls.rate; }

  async getAllCurrencies() {
    this.dataCurrencies = await this.currenciesService.getCurrencies();
    console.log("las currencias",this.dataCurrencies);

  }

  async showCurrenciesModal(id:number) {
    this.showCurrency = await this.currenciesService.getShowCurrency(id);
    console.log("showCurrency",this.showCurrency.data.currency);
  }

  async createCurrencyModal() {
    console.log("create Currency", this.createCurrencyForm);
    if (this.createCurrencyForm.valid) {
      this.currenciesService.postCreateCurrency(this.createCurrencyForm.value as Currency)
      .then((resp) => {
        this.editCurrency = resp;
        console.log("resp en comp login",resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Currencia completada');
        this.getAllCurrencies();
        this.createCurrencyForm.reset();
      });
    }else{
      this.createCurrencyForm.markAllAsTouched();
    }

  }

    async setEditCurrenciesModal(id: number) {
    this.showCurrency = await this.currenciesService.getShowCurrency(id);
    console.log(id);
    this.editCurrencyForm.controls['name'].setValue(this.showCurrency.data.currency.name);
    this.editCurrencyForm.controls['rate'].setValue(this.showCurrency.data.currency.rate);

  }

  async editCurrencyModal(id:number) {

    if (this.editCurrencyForm.valid) {
      this.currenciesService.putEditCurrency(id,this.editCurrencyForm.value as Currency)
      .then((resp) => {
        this.editCurrency = resp;
        console.log("resp en comp login",resp);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Currencia completada');
        this.getAllCurrencies();
        this.editCurrencyForm.reset();
      });
    }else{
      this.editCurrencyForm.markAllAsTouched();
    }
  }

  deleteCurrenciesModal(id:number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;

    console.log("open modal id:",id, " name: ",name);
  }

  delete(id:number){
    console.log("id a borrar:",id);
    this.currenciesService.deleteCurrency(id)
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('Eliminacion de Moneda completada');
      this.getAllCurrencies();
    });
  }

}
