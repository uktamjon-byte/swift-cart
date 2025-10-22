import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Tag } from '../../types/interfaces/product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  collapsed = false;
  selectedTag!: Tag;

  constructor(private router: Router) {}
  tags: Tag[] = [
    {
      id: 1,
      name: 'Technology',
      date: new Date('2025-10-07T09:00:00Z'),
    },
    { id: 2, name: 'Science', date: new Date('2025-10-06T14:30:00Z') },
    { id: 3, name: 'Health', date: new Date('2025-10-05T11:45:00Z') },
    { id: 4, name: 'Education', date: new Date('2025-10-04T08:20:00Z') },
  ];
  ngOnInit(): void {}

  contentReady = (e: any) => {
    if (!this.collapsed) {
      this.collapsed = true;
      e.component.expandRow(['EnviroCare']);
    }
  };

  onRowRemoved(e: any) {
    console.log('Deleted:', e.data);
  }

  onRowClick($event: any) {
    console.log('reree', $event.data);
    this.selectedTag = $event.data;
    // this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/product/tag/edit/${this.selectedTag.id}`]);
  }
}
