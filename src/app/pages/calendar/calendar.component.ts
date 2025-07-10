import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin];

  governmentHolidays = [
    { date: '2025-01-26', name: 'Republic Day' },
    { date: '2025-08-15', name: 'Independence Day' },
    { date: '2025-10-02', name: 'Gandhi Jayanti' },
    { date: '2025-12-25', name: 'Christmas' }
  ];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: this.calendarPlugins,
    dateClick: this.handleDateClick.bind(this),
    events: []
  };

  ngOnInit(): void {
    const rawLeaveList = localStorage.getItem('leaveList');
    const leaveList = rawLeaveList ? JSON.parse(rawLeaveList) : [];

    const leaveEvents = leaveList
      .filter((leave: any) => leave.status === 'Approved' || leave.status === 'Rejected')
      .map((leave: any) => {
        const start = new Date(leave.startDate);
        const end = new Date(leave.endDate);
        end.setDate(end.getDate() + 1); // FullCalendar end is exclusive

        return {
          title: `${leave.leaveType} (${leave.status})`,
          start: start.toISOString().split('T')[0],
          end: end.toISOString().split('T')[0],
          color: leave.status === 'Approved' ? '#4caf50' : '#f44336'
        };
      });

    const holidayEvents = this.governmentHolidays.map(holiday => ({
      title: holiday.name,
      start: holiday.date,
      color: '#2196f3'
    }));

    // Final event list
    this.calendarOptions.events = [
      ...leaveEvents,
      ...holidayEvents
    ];
  }

  handleDateClick(arg: any) {
    // alert('Date clicked: ' + arg.dateStr);
  }
}
