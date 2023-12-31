import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UsersComponent } from './components/users/users.component';
import { IndexComponent } from './components/index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermissionsGuard } from './guard/permissions.guard';
import { CategoriesComponent } from './components/categories/categories.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { PaymentsMethodsComponent } from './components/payments-methods/payments-methods.component';
import { ProductsComponent } from './components/products/products.component';
import { ProvidersComponent } from './components/providers/providers.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'home', component: IndexComponent},
  { path: 'index', component: DashboardComponent, canActivate: [PermissionsGuard]},
  { path: 'login', component: AuthenticationComponent },
  { path: 'users', component: UsersComponent, canActivate: [PermissionsGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [PermissionsGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [PermissionsGuard] },
  { path: 'currencies', component: CurrenciesComponent, canActivate: [PermissionsGuard] },
  { path: 'payments-methods', component: PaymentsMethodsComponent, canActivate: [PermissionsGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [PermissionsGuard] },
  { path: 'providers', component: ProvidersComponent, canActivate: [PermissionsGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
