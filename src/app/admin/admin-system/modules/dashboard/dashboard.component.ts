import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  cards = [
    {
      infoTitle: 'topSales',
      value: 155.5,
      icon: 'fa-solid fa-square-poll-vertical',
    },
    {
      infoTitle: 'totalOrders',
      value: 155.5,
      icon: 'fa-solid fa-clipboard',
    },
    {
      infoTitle: 'totalProducts',
      value: 155.5,
      icon: 'fa-solid fa-box-tissue',
    },
    {
      infoTitle: 'totalCustomers',
      value: 155.5,
      icon: 'fa-solid fa-users',
    },
  ];
  ngOnInit(): void {}

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333', // legend label color
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };

  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.barChartLabels,
    datasets: [{ data: [65, 59, 80, 81, 56], label: 'Sales Analytics' }],
  };
}
