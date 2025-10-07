import { Component, OnInit, ViewChild } from '@angular/core';
import { Brand } from '../../types/interfaces/product.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss'],
})
export class BrandListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  categories: any;
  selectedPost: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  brands: Brand[] = [
    {
      id: 1,
      title: 'Apple',
      date: new Date('2025-01-01'),
      logo: 'assets/imagis/product4.jpg',
      status: true,
    },
    {
      id: 2,
      title: 'Samsung',
      date: new Date('2025-01-05'),
      logo: 'assets/imagis/product5.jpg',
      status: false,
    },
    {
      id: 3,
      title: 'Nike',
      date: new Date('2025-02-01'),
      logo: 'assets/imagis/product1.jpg',
      status: true,
    },
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

    this.brands = this.brands.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    this.dataGrid.instance.clearSelection();
  };

  onRowClick($event: any) {
    console.log('reree');
    this.selectedPost = $event.data;
    // this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/product/brand/edit/${this.selectedPost.id}`]);
  }
}
