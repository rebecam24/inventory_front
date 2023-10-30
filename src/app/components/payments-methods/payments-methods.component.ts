import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentMethodsService } from 'src/app/services/payment-methods.service';
import { DataPayments, DataResponsePayments, DataResponseSaveOrUpdatePayments, Payments } from '../../Interfaces/payment-methods';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-payments-methods',
  templateUrl: './payments-methods.component.html',
  styleUrls: ['./payments-methods.component.css']
})
export class PaymentsMethodsComponent {

  public dataPayments: DataResponsePayments = { data:{ paymentMethods: [] },message:"",status:"" };
  public showPayments: DataResponseSaveOrUpdatePayments = { status:"", message:"", data:{ paymentMethod: {"id":-1,"type":""} } };
  public editPayments?: DataResponseSaveOrUpdatePayments;
  public data: any;
  public idDelete: number = -1;
  public nameDelete: string = '';
  sidebarExpanded = true;
  userLoginOn: boolean = false;


  editPaymentForm = this.formBuilder.group({
    type:         ['', [ Validators.minLength(3), Validators.maxLength(45)]],
  });

  createPaymentForm = this.formBuilder.group({
    type:         ['', [ Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
  });

  constructor(
    private paymentsService: PaymentMethodsService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router:Router,
    ) {
      this.data = this.paymentsService.subject.subscribe(resp=>{
        this.dataPayments = resp;
      });
      this.loginService.userLoginOn.subscribe(resp=>{
        this.userLoginOn =  resp;
      });

  }

  ngOnInit(): void {
    this.getAllPayments();
  }

  get type()          { return this.editPaymentForm.controls.type; }

  async getAllPayments() {
    this.dataPayments = await this.paymentsService.getPayments();
  }

  async showPaymentsModal(id:number) {
    this.showPayments = await this.paymentsService.getShowPayments(id);
  }

  async createPaymentModal() {
    if (this.createPaymentForm.valid) {
      this.paymentsService.postCreatePayments(this.createPaymentForm.value as Payments)
      .then((resp) => {
        this.editPayments = resp;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Pagos completada');
        this.getAllPayments();
        this.createPaymentForm.reset();
      });
    }else{
      this.createPaymentForm.markAllAsTouched();
    }

  }

  async setEditPaymentModal(id: number) {
    this.showPayments = await this.paymentsService.getShowPayments(id);
    this.editPaymentForm.controls['type'].setValue(this.showPayments.data.paymentMethod.type);
  }

  async editPaymentModal(id:number) {

    if (this.editPaymentForm.valid) {
      this.paymentsService.putEditPayment(id,this.editPaymentForm.value as Payments)
      .then((resp) => {
        this.editPayments = resp;
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        console.log('Creacion de Pagos completada');
        this.getAllPayments();
        this.editPaymentForm.reset();
      });
    }else{
      this.editPaymentForm.markAllAsTouched();
    }
  }

  deletePaymentsModal(id:number, name: string) {
    this.idDelete = id;
    this.nameDelete = name;
  }

  delete(id:number){
    this.paymentsService.deletePayment(id)
    .then((resp) => {
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log('Eliminacion de Usuario completada');
      this.getAllPayments();
    });
  }

}
