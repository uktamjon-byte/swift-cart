import { Component, OnInit, ViewChild } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  constructor(private translate: TranslateService) {
    this.addButtonOptions.text = this.translate.instant('addCity');
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.addButtonOptions.text = this.translate.instant('addCity');
    });
  }

  ngOnInit(): void {}

  cities = [
    { countryId: 1, name: 'Afganistan', code: 'AF' },
    { countryId: 2, name: 'Albania', code: 'AL' },
    { countryId: 3, name: 'Algeria', code: 'DZ' },
    { countryId: 4, name: 'Andorra', code: 'AD' },
    { countryId: 5, name: 'Angola', code: 'AO' },
    { countryId: 6, name: 'Argentina', code: 'AR' },
    { countryId: 7, name: 'Armenia', code: 'AM' },
    { countryId: 8, name: 'Australia', code: 'AU' },
  ];

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  addRow() {
    console.log('Add City clicked!');
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
    console.log('Added:', e.data);
  }

  onRowUpdated(e: any) {
    console.log('Edited:', e.data);
  }

  onRowRemoved(e: any) {
    console.log('Deleted:', e.data);
  }
}
