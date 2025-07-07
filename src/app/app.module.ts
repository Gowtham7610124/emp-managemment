import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { ListEmployeeComponent } from './pages/list-employee/list-employee.component';
import { UpdateEmployeeComponent } from './pages/update-employee/update-employee.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeeComponent,
    UpdateEmployeeComponent,
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    importProvidersFrom(MatNativeDateModule),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
