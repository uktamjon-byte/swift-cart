import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DxDataGridComponent } from 'devextreme-angular';
import { IProductCategory } from '../../types/interfaces/product.interface';
import { Router } from '@angular/router';

interface Category {
  name: string;
  children?: Category[];
}

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  treeControl = new NestedTreeControl<Category>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  collapsed = false;
  selectedPost: any;

  constructor(private dialog: MatDialog, private router: Router) {}

  categories: IProductCategory[] = [
    {
      id: 1,
      title: 'Electronics',
      thumbnail: 'assets/imagis/product1.jpg',
      date: new Date('2025-01-10'),
    },
    {
      id: 2,
      title: 'Clothing',
      thumbnail: 'assets/imagis/product1.jpg',
      date: new Date('2025-02-05'),
    },
    {
      id: 3,
      title: 'Home & Kitchen',
      thumbnail: 'assets/imagis/product1.jpg',
      date: new Date('2025-03-01'),
    },
  ];

  ngOnInit(): void {}
  hasChild = (_: number, node: Category) =>
    !!node.children && node.children.length > 0;

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  deleteSelected = () => {
    const selectedData = this.dataGrid.instance.getSelectedRowsData();
    if (selectedData.length === 0) return;

    this.categories = this.categories.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    this.dataGrid.instance.clearSelection();
  };

  onRowClick($event: any) {
    console.log('reree');
    this.selectedPost = $event.data;
    // this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/product/categories/edit/${this.selectedPost.id}`]);
  }

  onSubmit() {}
}
