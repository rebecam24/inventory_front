import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { PaymentsMethodsComponent } from './components/payments-methods/payments-methods.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    UsersComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    CategoriesComponent,
    ClientsComponent,
    CurrenciesComponent,
    PaymentsMethodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
