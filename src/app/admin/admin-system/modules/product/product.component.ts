import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IProduct } from './types/interfaces/product.interface';
import { Router } from '@angular/router';
import { ProductService } from './services/product.service';
import DataGrid from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  gridInstance!: DataGrid;
  collapsed!: boolean;
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;
  products!: IProduct[];
  constructor(private productService: ProductService, private route: Router) {}

  ngOnInit(): void {
    this.products = this.productService.products;

    console.log('product', this.products);
  }

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  public onInitGrid(e: any) {
    console.log('init grid', e);
    this.gridInstance = e.component;
  }

  onRowClick($event: any) {
    console.log('reree');
    const rowData = $event.data;
    this.route.navigate([`product/edit/${rowData.id}`]);
    console.log('roew data', rowData);
  }

  deleteSelected = () => {
    const selectedData = this.dataGrid.instance.getSelectedRowsData();
    if (selectedData.length === 0) return;

    // Remove selected rows from dataSource
    this.products = this.products.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    // Refresh grid selection
    this.dataGrid.instance.clearSelection();
  };
}
