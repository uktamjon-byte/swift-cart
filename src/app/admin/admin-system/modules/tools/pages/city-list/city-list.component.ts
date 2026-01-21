import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { CountryService } from '../../services/country.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { ICity } from '../../types/interfaces/tools.interface';
import { RowRemovingEvent } from 'devextreme/ui/data_grid';
import { PermissionsService } from 'src/app/admin/admin-auth/services/permission.service';
import { permissions } from 'src/app/constants/permissions';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit, OnDestroy {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  id: number | null = null;
  private destroy$ = new Subject<void>();
  cities: ICity[] = [];
  permissions = permissions;
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private notifyServiceMessage: NotifyServiceMessage,
    public permission: PermissionsService
  ) {
    this.addButtonOptions.text = this.translate.instant('addCity');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.addButtonOptions.text = this.translate.instant('addCity');
    });
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== null && !isNaN(this.id)) {
        this.countryService
          .getCitiesById(this.id)
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
          .subscribe((res) => {
            if (res.success) {
              this.cities = res.data;
              console.log('city res', res);
            }
            if (res.success && res.data.length === 0) {
              this.notifyServiceMessage.opeSnackBar(
                'City list is empty, please add city to this country',
                NotifyMessageType.notify
              );
            }
          });
      }
    });
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  addRow() {
    this.dataGrid.instance.addRow();
  }

  addButtonOptions = {
    text: '',
    icon: 'plus',
    type: 'default',
    stylingMode: 'contained',
    onClick: () => this.addRow(),
  };

  onRowInserted(e: any) {
    const city = {
      name: e.data.name,
      countryId: this.id,
    };
    this.countryService
      .postCity(city)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while posting new city, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (response.success) {
          this.notifyServiceMessage.opeSnackBar(
            'New city has been created successfully',
            NotifyMessageType.notify
          );
          this.getCities();
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to post new city',
            NotifyMessageType.error
          );
        }
      });
  }

  onRowUpdated(e: any) {
    const { createdAt, id, updatedAt, ...data } = e.data;
    this.countryService
      .updateCity(this.id, data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while editing city, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.notifyServiceMessage.opeSnackBar(
            'City has been updated successfully',
            NotifyMessageType.notify
          );
        }
      });
  }

  onRowRemoving(e: RowRemovingEvent) {
    e.cancel = true;
    this.countryService
      .deleteCity(e.data.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong deleting city, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((data) => {
        if (data.success) {
          this.cities = this.cities.filter((r) => r.id !== e.data.id);
          this.notifyServiceMessage.opeSnackBar(
            'City has been deleted successfully',
            NotifyMessageType.notify
          );
        } else {
          e.cancel = true;
          this.notifyServiceMessage.opeSnackBar(
            'Failed to delete this city',
            NotifyMessageType.error
          );
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
