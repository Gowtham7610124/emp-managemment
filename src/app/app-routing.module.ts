import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ListEmployeeComponent } from './pages/list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
   { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'emp-list',
        component: ListEmployeeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'emp-update',
        component: UpdateEmployeeComponent,
        canActivate:[authGuard]
      },
      {
        path: 'create-employee',
        component: CreateEmployeeComponent,
        canActivate:[authGuard]

      }
    ]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
