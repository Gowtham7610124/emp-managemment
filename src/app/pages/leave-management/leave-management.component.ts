import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.css'
})
export class LeaveManagementComponent {
  leaveForm!: FormGroup;

  leaveDetails = {
    sickLeave: 0,
    casualLeave: 0,
    privilageLeave: 0
  };

  leaveList: any[] = [];

  // ✅ Add Government Holidays
  governmentHolidays: string[] = [
    '2025-01-26', // Republic Day
    '2025-08-15', // Independence Day
    '2025-10-02', // Gandhi Jayanti
    '2025-12-25'  // Christmas
    // Add more as needed
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const localLeaveData: any = localStorage.getItem('leaveObj');
    let leaveObj = localLeaveData ? JSON.parse(localLeaveData) : null;

    if (!leaveObj) {
      leaveObj = {
        sickLeave: 5,
        casualLeave: 10,
        privilageLeave: 10
      };
      localStorage.setItem('leaveObj', JSON.stringify(leaveObj));
    }

    this.leaveDetails = leaveObj;

    const localListData = localStorage.getItem('leaveList');
    this.leaveList = localListData ? JSON.parse(localListData) : [];

    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(5)]],
      leaveDates: this.fb.group({
        start: ['', Validators.required],
        end: ['', Validators.required]
      })
    }, { validators: this.validateLeaveDates.bind(this) });
  }

  // ✅ Count only working days (excluding weekends and holidays)
  getWorkingDays(start: Date, end: Date): number {
    let count = 0;
    const curDate = new Date(start);

    while (curDate <= end) {
      const day = curDate.getDay(); // 0: Sunday, 6: Saturday
      const formatted = curDate.toISOString().split('T')[0];

      const isWeekend = day === 0 || day === 6;
      const isHoliday = this.governmentHolidays.includes(formatted);

      if (!isWeekend && !isHoliday) {
        count++;
      }

      curDate.setDate(curDate.getDate() + 1);
    }

    return count;
  }

  validateLeaveDates(formGroup: AbstractControl): { [key: string]: any } | null {
    const type = formGroup.get('leaveType')?.value;
    const start = formGroup.get('leaveDates.start')?.value;
    const end = formGroup.get('leaveDates.end')?.value;

    if (!start || !end || !type) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (startDate < today || endDate < today) {
      return { dateRangeInvalid: true };
    }

    const workingDays = this.getWorkingDays(startDate, endDate);

    let allowed = 0;
    if (type === 'sick') allowed = this.leaveDetails.sickLeave;
    else if (type === 'casual') allowed = this.leaveDetails.casualLeave;
    else if (type === 'privilageLeave') allowed = this.leaveDetails.privilageLeave;

    if (workingDays === 0 || workingDays > allowed) {
      return { dateRangeInvalid: true };
    }

    return null;
  }

  onSubmit() {
    if (this.leaveForm.invalid) return;

    const formValue = this.leaveForm.value;
    const leaveType = formValue.leaveType;
    const start = new Date(formValue.leaveDates.start);
    const end = new Date(formValue.leaveDates.end);

    const totalDays = this.getWorkingDays(start, end); // ✅ Working days only

    // Reduce leave balance
    if (leaveType === 'sick') {
      this.leaveDetails.sickLeave -= totalDays;
    } else if (leaveType === 'casual') {
      this.leaveDetails.casualLeave -= totalDays;
    } else if (leaveType === 'privilageLeave') {
      this.leaveDetails.privilageLeave -= totalDays;
    }

    localStorage.setItem('leaveObj', JSON.stringify(this.leaveDetails));

    const newLeave = {
      id: Date.now(),
      leaveType: this.getLeaveTypeName(leaveType),
      appliedOn: new Date(),
      status: 'Approved',
      comment: formValue.comment,
      startDate: start,
      endDate: end,
      totalDays: totalDays
    };

    this.leaveList.push(newLeave);
    localStorage.setItem('leaveList', JSON.stringify(this.leaveList));

    alert('Leave request submitted successfully.');

    this.leaveForm.reset({
      leaveType: '',
      comment: '',
      leaveDates: {
        start: '',
        end: ''
      }
    });
    this.leaveForm.markAsPristine();
    this.leaveForm.markAsUntouched();
    this.leaveForm.updateValueAndValidity();
  }

  getLeaveTypeName(key: string): string {
    switch (key) {
      case 'sick': return 'Sick Leave';
      case 'casual': return 'Casual Leave';
      case 'privilageLeave': return 'Privilege Leave';
      default: return key;
    }
  }
}
