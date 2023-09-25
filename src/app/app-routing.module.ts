import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UsersComponent } from './components/users/users.component';
import { IndexComponent } from './components/index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'/index', pathMatch: 'full'},
  { path: 'index', component: DashboardComponent},
  { path: 'login', component: AuthenticationComponent },
  { path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
