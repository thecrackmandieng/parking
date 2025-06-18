import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  numberOfReservations = 120;
  availableSpots = 45;
  numberOfParkings = 8;

  lineChartData = [
    { data: [10, 20, 30, 25, 35, 60, 75], label: 'Réservations hebdo' }
  ];

  lineChartLabels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true
  };
  lineChartLegend = true;
  lineChartType: 'line' = 'line';
  lineChartColors = [
    {
      borderColor: '#2980b9',
      backgroundColor: 'rgba(41, 128, 185, 0.2)',
    }
  ];
}
