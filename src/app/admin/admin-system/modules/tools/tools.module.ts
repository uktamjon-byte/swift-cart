import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { ToolsRoutingModule } from './tools-routing.module';
import {
  DxBulletModule,
  DxButtonModule,
  DxDataGridModule,
  DxSwitchModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CityListComponent } from './pages/city-list/city-list.component';
import { CountryService } from './services/country.service';

@NgModule({
  declarations: [CountryListComponent, CityListComponent],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    DxDataGridModule,
    DxBulletModule,
    DxTemplateModule,
    TranslateModule,
    DxButtonModule,
    DxSwitchModule,
  ],
  providers: [CountryService],
})
export class ToolsModule {}
