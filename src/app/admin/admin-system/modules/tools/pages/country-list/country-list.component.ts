import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { ICountry } from '../../types/interfaces/tools.interface';
import { Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit, OnDestroy {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedCountry!: ICountry;
  private destroy$ = new Subject<void>();
  countries: ICountry[] = [];
  permissions = permissions;
  constructor(
    private router: Router,
    private countryService: CountryService,
    private notifyServiceMessage: NotifyServiceMessage,
    public permission: PermissionsService
  ) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService
      .getCountries()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (response.success) {
          this.countries = response.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load countries',
            NotifyMessageType.error
          );
        }
      });
  }

  onStatusChange(e: any, cellData: any) {
    const newStatus = e.value;
    cellData.setValue(newStatus);
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  goToCities(countryId: number) {
    if (this.permission.has(this.permissions.cityRead)) {
      this.router.navigate(['/admin/tools/countries/cities', countryId]);
    } else {
      this.router.navigate(['/admin/401']);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
