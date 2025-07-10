import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  userData: any[] = [];
  departmentsDetails: any[] = [];
  designationsList: any[] = [];
  employeeForm!: FormGroup;
  selectedEmpId: any;
  
  http = inject(HttpClient);
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeId: [0],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      designationId: ['', Validators.required],
      departmentId: ['', Validators.required],
      employeeType: ['', Validators.required],
      salary: [0, Validators.required],
    });

    this.getDepartments(); // Load departments first
    this.getAllUser();
  }

  getDepartments() {
    this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments')
      .subscribe({
        next: (res: any) => {
          this.departmentsDetails = res;
        },
        error: (err) => {
          console.error("Error fetching departments:", err);
        }
      });
  }

  getAllUser() {
    this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetEmployees')
      .subscribe({
        next: (res: any) => {
          this.userData = res;
        },
        error: (err) => {
          console.error("Error fetching users:", err);
        }
      });
  }

callOnChange() {
  const selected = this.userData.find(emp => emp.employeeId === this.selectedEmpId);
  if (selected) {
    const dept = this.departmentsDetails.find(d => d.departmentName === selected.departmentName);
    const deptId = dept ? dept.departmentId : null;

    // Call designation API with deptId
    if (deptId) {
      this.getDesignationsByDept(deptId).subscribe((res: any[]) => {
        this.designationsList = res;

        const designation = res.find(d => d.designationName === selected.designationName);
        const designationId = designation ? designation.designationId : null;

        this.employeeForm.patchValue({
          employeeId: selected.employeeId,
          fullName: selected.fullName,
          email: selected.email,
          phone: selected.phone,
          gender: selected.gender,
          dateOfJoining: new Date(selected.dateOfJoining),
          departmentId: deptId,
          designationId: 1,
          employeeType: selected.employeeType,
          salary: selected.salary
        });
      });
    this.getAllUser();

    }
  }
}
  // Fetch designations by department ID
getDesignationsByDept(deptId: number) {
  return this.http.get<any[]>(`https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId=${deptId}`);
}


// Called when user selects department manually
onDepartmentChange(event: any) {
  const deptId = event.value;
  this.getDesignationsByDept(deptId).subscribe((res: any[]) => {
    this.designationsList = res;
    this.employeeForm.patchValue({ designationId: null });
  });
}


  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      const updateUrl = `https://api.freeprojectapi.com/api/EmployeeApp/UpdateEmployee?id=${this.selectedEmpId}`;
      
      this.http.put(updateUrl, formData)
        .subscribe({
          next: () => {
    this.getAllUser();
            
            alert('Employee updated successfully!');
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
