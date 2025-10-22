import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { CityListComponent } from './pages/city-list/city-list.component';

const routes: Routes = [
  { path: 'countries', component: CountryListComponent },
  { path: 'countries/cities/:id', component: CityListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
