import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.css'
})
export class ListEmployeeComponent {
   http = inject(HttpClient);
  userData: any[] = [];

  
  ngOnInit():void{
    this.getAllUser();
  }
  getAllUser(){
    let userData:any
    this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetEmployees')
      .subscribe({
        next: (res: any) => {
          this.userData = res;
          console.log("userData ======", this.userData);
        },
        error: (err) => {
          console.error("Error fetching users:", err);
        }
      });
  }

  delEmp(id:number){
    // https://api.freeprojectapi.com/api/EmployeeApp/DeleteEmployee?id=1

     if (confirm('Are you sure you want to delete this employee?')) {
    this.http.delete(`https://api.freeprojectapi.com/api/EmployeeApp/DeleteEmployee?id=${id}`)
      .subscribe({
        next: () => {
          alert('Employee deleted successfully!');
          this.getAllUser(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Delete error:', err);
          alert('Error deleting employee.');
        }
      });
  }
  }
}
