import { NgModule } from '@angular/core';
import { StoreRoutingModule } from './store-routing.module';


import { StoreComponent } from './store.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/components/shared-module';





@NgModule({
  declarations: [
    StoreComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    
  ],
  providers: []
})
export class StoreModule { }