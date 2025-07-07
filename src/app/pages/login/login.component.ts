import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   loginObj:any = {
    "userName": "",
    "password": ""
  }
  http = inject(HttpClient);
  route = inject(Router)

  loginEmployee(){
    console.log(this.loginObj)
    if(this.loginObj.userName == 'admin' && this.loginObj.password == 'Admin@123'){
      localStorage.setItem("loginStatus",'true')
      this.route.navigateByUrl('/layout/emp-list');
    }
  }
}
