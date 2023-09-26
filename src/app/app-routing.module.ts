import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UsersComponent } from './components/users/users.component';
import { IndexComponent } from './components/index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'home', component: IndexComponent},
  { path: 'index', component: DashboardComponent},
  { path: 'login', component: AuthenticationComponent },
  { path: 'users', component: UsersComponent }

  // { path: 'users', component: UsersComponent,
  //   children: [
  //     {
  //       path: 'show',
  //       component: ChileComponent
  //     },
  //     {
  //       path: 'argentina',
  //       component: ArgentinaComponent
  //     },
  //     {
  //       path: 'uruguay',
  //       component: UruguayComponent
  //     }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
