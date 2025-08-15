import { Component, enableProdMode, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import DataGrid from 'devextreme/ui/data_grid';
import { PostBlogService } from '../services/post.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

let modulePrefix = '';
// @ts-ignore
if (window && window.config?.packageConfigPaths) {
  modulePrefix = '/app';
}
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(
    private router: Router,
    private postBlogService: PostBlogService
  ) {}

  private gridInstance!: DataGrid;

  ngOnInit(): void {}
  dataSource = [
    {
      id: 1,
      check: false,
      title: 'Stories of Satisfaction and Success',
      user: 'Demo Admin',
      image: 'assets/imagis/product1.jpg',
      publishStatus: 'Published',
      date: Date(),
    },
    {
      id: 2,
      check: true,
      title: 'Stories of Satisfaction and Success',
      user: 'Demo Admin',
      image: 'assets/imagis/product2.jpg',
      publishStatus: 'Published',
      date: Date(),
    },
    // more rows...
  ];

  collapsed = false;

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  // deleteSelected = () => {
  //   const selectedRows = this.dataGrid.instance.getSelectedRowsData();

  //   // Remove selected rows from dataSource
  //   this.dataSource = this.dataSource.filter(
  //     (item) => !selectedRows.some((selected) => selected.ID === item.id)
  //   );
  // };

  // navigateToCreatePost() {
  //   console.log('navigate from posts');
  //   this.router.navigate(['blog/post/create']);
  // }

  public onInitGrid(e: any) {
    console.log('init grid', e);
    this.gridInstance = e.component;
  }

  public onSearch() {
    console.log('str');
    this.gridInstance.searchByText('str');
  }

  onRowClick($event: any) {
    console.log('reree');
    const rowData = $event.data;
    this.postBlogService.setPost(rowData);
    this.router.navigate([`/blog/post-edit/${rowData.id}`]);
    console.log(rowData);
  }

  deleteSelected = () => {
    const selectedData = this.dataGrid.instance.getSelectedRowsData();
    if (selectedData.length === 0) return;

    // Remove selected rows from dataSource
    this.dataSource = this.dataSource.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    // Refresh grid selection
    this.dataGrid.instance.clearSelection();
  };
}
