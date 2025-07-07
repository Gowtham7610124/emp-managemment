import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  @HostListener('window:unload', ['$event'])
  route=inject(Router)

  clearStorage(event: any) {
    localStorage.removeItem('loginStatus');  // or clear() to wipe all
  }

   logout(){
    localStorage.removeItem('loginStatus');  // or clear() to wipe all
    this.route.navigateByUrl('')
  }
}
