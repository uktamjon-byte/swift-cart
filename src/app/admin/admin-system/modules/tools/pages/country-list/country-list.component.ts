import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ICountry } from '../../types/interfaces/tools.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedCountry!: ICountry;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  countries: ICountry[] = [
    { id: 1, name: 'Afghanistan', code: 'AF' },
    { id: 2, name: 'Albania', code: 'AL' },
    { id: 3, name: 'Algeria', code: 'DZ' },
    { id: 4, name: 'Andorra', code: 'AD' },
    { id: 5, name: 'Angola', code: 'AO' },
    { id: 6, name: 'Argentina', code: 'AR' },
    { id: 7, name: 'Armenia', code: 'AM' },
    { id: 8, name: 'Australia', code: 'AU' },
    { id: 9, name: 'Austria', code: 'AT' },
    { id: 10, name: 'Azerbaijan', code: 'AZ' },
    { id: 11, name: 'Bahamas', code: 'BS' },
    { id: 12, name: 'Bahrain', code: 'BH' },
    { id: 13, name: 'Bangladesh', code: 'BD' },
    { id: 14, name: 'Belarus', code: 'BY' },
    { id: 15, name: 'Belgium', code: 'BE' },
    { id: 16, name: 'Belize', code: 'BZ' },
    { id: 17, name: 'Benin', code: 'BJ' },
    { id: 18, name: 'Bhutan', code: 'BT' },
    { id: 19, name: 'Bolivia', code: 'BO' },
    { id: 20, name: 'Bosnia and Herzegovina', code: 'BA' },
    { id: 21, name: 'Botswana', code: 'BW' },
    { id: 22, name: 'Brazil', code: 'BR' },
    { id: 23, name: 'Bulgaria', code: 'BG' },
    { id: 24, name: 'Cambodia', code: 'KH' },
    { id: 25, name: 'Cameroon', code: 'CM' },
    { id: 26, name: 'Canada', code: 'CA' },
    { id: 27, name: 'Chad', code: 'TD' },
    { id: 28, name: 'Chile', code: 'CL' },
    { id: 29, name: 'China', code: 'CN' },
    { id: 30, name: 'Colombia', code: 'CO' },
    { id: 31, name: 'Congo', code: 'CG' },
    { id: 32, name: 'Costa Rica', code: 'CR' },
    { id: 33, name: 'Croatia', code: 'HR' },
    { id: 34, name: 'Cuba', code: 'CU' },
    { id: 35, name: 'Cyprus', code: 'CY' },
    { id: 36, name: 'Czech Republic', code: 'CZ' },
    { id: 37, name: 'Denmark', code: 'DK' },
    { id: 38, name: 'Djibouti', code: 'DJ' },
    { id: 39, name: 'Dominican Republic', code: 'DO' },
    { id: 40, name: 'Ecuador', code: 'EC' },
    { id: 41, name: 'Egypt', code: 'EG' },
    { id: 42, name: 'El Salvador', code: 'SV' },
    { id: 43, name: 'Estonia', code: 'EE' },
    { id: 44, name: 'Ethiopia', code: 'ET' },
    { id: 45, name: 'Finland', code: 'FI' },
    { id: 46, name: 'France', code: 'FR' },
    { id: 47, name: 'Germany', code: 'DE' },
    { id: 48, name: 'Ghana', code: 'GH' },
    { id: 49, name: 'Greece', code: 'GR' },
    { id: 50, name: 'Hungary', code: 'HU' },
    { id: 51, name: 'Iceland', code: 'IS' },
    { id: 52, name: 'India', code: 'IN' },
    { id: 53, name: 'Indonesia', code: 'ID' },
    { id: 54, name: 'Iran', code: 'IR' },
    { id: 55, name: 'Iraq', code: 'IQ' },
    { id: 56, name: 'Ireland', code: 'IE' },
    { id: 57, name: 'Israel', code: 'IL' },
    { id: 58, name: 'Italy', code: 'IT' },
    { id: 59, name: 'Japan', code: 'JP' },
    { id: 60, name: 'Kazakhstan', code: 'KZ' },
    { id: 61, name: 'Kenya', code: 'KE' },
    { id: 62, name: 'Kyrgyzstan', code: 'KG' },
    { id: 63, name: 'Laos', code: 'LA' },
    { id: 64, name: 'Latvia', code: 'LV' },
    { id: 65, name: 'Lebanon', code: 'LB' },
    { id: 66, name: 'Lithuania', code: 'LT' },
    { id: 67, name: 'Luxembourg', code: 'LU' },
    { id: 68, name: 'Madagascar', code: 'MG' },
    { id: 69, name: 'Malaysia', code: 'MY' },
    { id: 70, name: 'Maldives', code: 'MV' },
    { id: 71, name: 'Mexico', code: 'MX' },
    { id: 72, name: 'Moldova', code: 'MD' },
    { id: 73, name: 'Monaco', code: 'MC' },
    { id: 74, name: 'Mongolia', code: 'MN' },
    { id: 75, name: 'Morocco', code: 'MA' },
    { id: 76, name: 'Nepal', code: 'NP' },
    { id: 77, name: 'Netherlands', code: 'NL' },
    { id: 78, name: 'New Zealand', code: 'NZ' },
    { id: 79, name: 'Nigeria', code: 'NG' },
    { id: 80, name: 'Norway', code: 'NO' },
    { id: 81, name: 'Pakistan', code: 'PK' },
    { id: 82, name: 'Panama', code: 'PA' },
    { id: 83, name: 'Paraguay', code: 'PY' },
    { id: 84, name: 'Peru', code: 'PE' },
    { id: 85, name: 'Philippines', code: 'PH' },
    { id: 86, name: 'Poland', code: 'PL' },
    { id: 87, name: 'Portugal', code: 'PT' },
    { id: 88, name: 'Qatar', code: 'QA' },
    { id: 89, name: 'Romania', code: 'RO' },
    { id: 90, name: 'Russia', code: 'RU' },
    { id: 91, name: 'Saudi Arabia', code: 'SA' },
    { id: 92, name: 'Serbia', code: 'RS' },
    { id: 93, name: 'Singapore', code: 'SG' },
    { id: 94, name: 'Slovakia', code: 'SK' },
    { id: 95, name: 'Slovenia', code: 'SI' },
    { id: 96, name: 'South Africa', code: 'ZA' },
    { id: 97, name: 'South Korea', code: 'KR' },
    { id: 98, name: 'Spain', code: 'ES' },
    { id: 99, name: 'Sweden', code: 'SE' },
    { id: 100, name: 'Switzerland', code: 'CH' },
  ];

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  deleteSelected = () => {
    const selectedData = this.dataGrid.instance.getSelectedRowsData();
    if (selectedData.length === 0) return;

    this.countries = this.countries.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    this.dataGrid.instance.clearSelection();
  };

  // onRowClick($event: any) {
  //   console.log('reree');
  //   this.selectedCountry = $event.data;
  //   // this.postBlogService.setPost(this.selectedPost);
  //   //this.router.navigate([`/users/edit/${this.selectedUser.id}`]);
  // }

  goToCities(countryId: number) {
    console.log('idd', countryId);
    this.router.navigate(['/tools/countries/cities', countryId]);
  }
}
