import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './pages/country-list/country-list.component';
import { CityListComponent } from './pages/city-list/city-list.component';
import { permissions } from 'src/app/constants/permissions';
import { PermissionGuard } from 'src/app/admin/admin-auth/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full',

    data: { breadcrumb: 'Tools' },
  },
  {
    path: 'countries',
    canActivate: [PermissionGuard],
    component: CountryListComponent,
    data: { breadcrumb: 'Countries', permission: permissions.countryRead },
  },
  {
    path: 'countries/cities/:id',
    canActivate: [PermissionGuard],
    component: CityListComponent,
    data: { breadcrumb: 'Create Cities', permission: permissions.cityRead },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
