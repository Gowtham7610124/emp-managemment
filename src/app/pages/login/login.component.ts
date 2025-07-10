import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginTab = true;

  authData: any = {
    userName: '',
    password: '',
    email: ''
  };

  errorMessage = '';

  constructor(private router: Router) {
    // Initialize localStorage with admin user if not already there
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
      localStorage.setItem('users', JSON.stringify([
        { userName: 'admin', password: 'Admin@123', email: 'admin@gmail.com' }
      ]));
    }
  }

  switchTab(isLogin: boolean) {
    this.isLoginTab = isLogin;
    this.authData = { userName: '', password: '', email: '' };
    this.errorMessage = '';
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const pwdRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return pwdRegex.test(password);
  }

  loginEmployee() {
    const { userName, password } = this.authData;

    if (!userName || !password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (!this.validatePassword(password)) {
      this.errorMessage = 'Password must be at least 6 characters, include 1 uppercase and 1 special character';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.userName === userName && u.password === password);

    if (!user) {
      this.errorMessage = 'Invalid credentials';
      return;
    }

    localStorage.setItem('loginStatus', 'true');
    this.router.navigateByUrl('/layout/emp-dashboard');
  }

  registerEmployee() {
    const { userName, password, email } = this.authData;

    if (!userName || !password || !email) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (!this.validatePassword(password)) {
      this.errorMessage = 'Password must be at least 6 characters, include 1 uppercase and 1 special character';
      return;
    }

    if (!this.validateEmail(email)) {
      this.errorMessage = 'Enter a valid email';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: any) => u.userName === userName)) {
      this.errorMessage = 'Username already exists';
      return;
    }

    users.push({ userName, password, email });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful! You can now log in.');
    this.switchTab(true);
  }
}
