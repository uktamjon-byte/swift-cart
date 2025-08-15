import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { PostBlogService } from '../services/post.service';
import { ComponentMode } from '../../types/enums/post.enum';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  collapsed = false;
  selectedPost: any;
  // dataGrid!: DxDataGridComponent;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;

  constructor(
    private router: Router,
    private postBlogService: PostBlogService
  ) {}

  dataSource = [
    {
      id: 1,
      check: false,
      date: Date(),
      title: 'Stories of Satisfaction and Success',
    },
    {
      id: 2,
      check: true,
      date: Date(),
      title: 'Stories of Satisfaction and Success',
    },
    // more rows...
  ];

  ngOnInit(): void {}

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  deleteSelected = () => {
    const selectedData = this.dataGrid.instance.getSelectedRowsData();
    if (selectedData.length === 0) return;

    this.dataSource = this.dataSource.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    this.dataGrid.instance.clearSelection();
  };

  onRowClick($event: any) {
    console.log('reree');
    this.selectedPost = $event.data;
    this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/blog/category/${this.selectedPost.id}`]);
  }
}
