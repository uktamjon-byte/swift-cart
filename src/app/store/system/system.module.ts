import { NgModule } from '@angular/core';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { CommonModule } from '@angular/common';






@NgModule({
  declarations: [
    SystemComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule
  ],
  providers: []
})
export class SystemModule { }