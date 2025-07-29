import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AdminDashboardRoutingModule } from './dashboard-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    NgChartsModule,
    TranslateModule,
  ],
})
export class AdminDashboardModule {}
