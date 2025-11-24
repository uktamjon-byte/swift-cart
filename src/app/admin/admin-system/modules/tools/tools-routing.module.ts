import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { CityListComponent } from './pages/city-list/city-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full',
    data: { breadcrumb: 'Tools' },
  },
  {
    path: 'countries',
    component: CountryListComponent,
    data: { breadcrumb: 'Countries' },
  },
  {
    path: 'countries/cities/:id',
    component: CityListComponent,
    data: { breadcrumb: 'Create Cities' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
