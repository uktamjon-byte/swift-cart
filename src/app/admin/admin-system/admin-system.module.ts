import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header/header.component';
import { LeftSidebarComponent } from './core/left-sidebar/left-sidebar.component';
import { FooterComponent } from './core/footer/footer.component';
import { AdminSystemComponent } from './admin-system.component';
import { AdminSystemRoutingModule } from './admin-system-routing.module';
import { SharedModule } from '../../shared/components/shared-module';
import { MatMenuModule } from '@angular/material/menu';
import { AdminService } from './services/admin.service';
import { BreadcrumbModule } from 'xng-breadcrumb';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftSidebarComponent,
    FooterComponent,
    AdminSystemComponent,
  ],
  imports: [
    CommonModule,
    AdminSystemRoutingModule,
    SharedModule,
    MatMenuModule,
    BreadcrumbModule,
  ],
  providers: [AdminService],
})
export class AdminSystemModule {}
