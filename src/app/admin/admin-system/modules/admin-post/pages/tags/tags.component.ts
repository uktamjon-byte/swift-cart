import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { PostBlogService } from '../services/post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  collapsed: any;
  selectedPost: any;
  constructor(
    private router: Router,
    private postBlogService: PostBlogService
  ) {}

  ngOnInit(): void {}

  dataSource = [
    {
      id: 1,
      check: false,
      date: Date(),
      title: 'ClienTestimonials',
    },
    {
      id: 2,
      check: true,
      date: Date(),
      title: 'RealReviews',
    },
    // more rows...
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

    this.dataSource = this.dataSource.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    this.dataGrid.instance.clearSelection();
  };

  onRowClick($event: any) {
    console.log('reree');
    this.selectedPost = $event.data;
    this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/blog/tag/${this.selectedPost.id}`]);
  }
}
