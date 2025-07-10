import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employeeForm!: FormGroup;

  departments:any []=[];

  designations:any[]= [];

  @ViewChild(FormGroupDirective) formDirective!: FormGroupDirective;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeId: [0],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfJoining: [new Date(), Validators.required],
      departmentId: [, Validators.required],
      designationId: [, Validators.required],
      employeeType: ['', Validators.required],
      salary: [0, [Validators.required, Validators.min(0)]]
    });

    this.getDepartments();
  }

  http = inject(HttpClient)

  getDepartments(){
    this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments')
      .subscribe({
        next: (res: any) => {
          this.departments = res;
        },
        error: (err) => {
          console.error("Error fetching departments:", err);
        }
      });
  }

  getDesignationsByDept() {
  let deptId = this.employeeForm.value.departmentId;

  this.http.get<any[]>(`https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId=${deptId}`)
    .subscribe({
      next: (res) => {
        this.designations = res;
      },
      error: (err) => {
        console.error("Failed to load designations:", err);
      }
    });
}

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      const updateUrl = "https://api.freeprojectapi.com/api/EmployeeApp/CreateEmployee";
      
      this.http.post(updateUrl, formData)
        .subscribe({
          next: () => {
            this.departments=[];

  this.designations = [];
            this.formDirective.resetForm();

        
            // this.employeeForm.reset();

            alert('Employee Created successfully!');
          },
          error: (err) => {
            console.error('Update error:', err);
            alert('Error updating employee!');
          }
        });
    } else {
      console.warn('Form is invalid');
    }
  }
}
