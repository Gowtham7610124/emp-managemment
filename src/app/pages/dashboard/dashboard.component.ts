import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Bar Chart - Leave Taken
  public barChartData = {
    labels: ['Sick', 'Casual', 'Privilege'],
    datasets: [
      { data: [3, 5, 2], label: 'Leave Taken' },
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };
  public barChartType: any = 'bar';

  // Doughnut Chart - Leave Balance
  public doughnutChartData = {
    labels: ['Sick', 'Casual', 'Privilege'],
    datasets: [{ data: [2, 5, 8] }]
  };
  public doughnutChartType: any = 'doughnut';

  // Line Chart - Monthly Attendance
  public lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ data: [22, 20, 21, 18, 23, 25], label: 'Attendance Days' }]
  };
  public lineChartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };
  public lineChartType: any = 'line';

  // Pie Chart - Department Distribution
  public pieChartData = {
    labels: ['HR', 'Development', 'Sales', 'Support'],
    datasets: [{ data: [5, 15, 7, 3] }]
  };
  public pieChartType: any = 'pie';

  // Radar Chart - Employee Skill Ratings
  public radarChartData = {
    labels: ['Communication', 'Teamwork', 'Technical', 'Leadership', 'Problem Solving'],
    datasets: [{ data: [4, 3, 5, 3, 4], label: 'Skill Rating' }]
  };
  public radarChartType: any = 'radar';

}
