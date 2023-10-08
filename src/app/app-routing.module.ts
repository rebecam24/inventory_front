import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UsersComponent } from './components/users/users.component';
import { IndexComponent } from './components/index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PermissionsGuard } from './guard/permissions.guard';
import { CategoriesComponent } from './components/categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full'},
  { path: 'home', component: IndexComponent},
  { path: 'index', component: DashboardComponent, canActivate: [PermissionsGuard]},
  { path: 'login', component: AuthenticationComponent },
  { path: 'users', component: UsersComponent, canActivate: [PermissionsGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [PermissionsGuard] }

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
