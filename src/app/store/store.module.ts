import { NgModule } from '@angular/core';
import { StoreRoutingModule } from './store-routing.module';

import { StoreComponent } from './store.component';
import { CommonModule } from '@angular/common';





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