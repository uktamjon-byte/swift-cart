import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { UserReview } from '../../types/interfaces/product.interface';
import { ReviewStatus } from '../../types/enams/product.enam';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedReview!: UserReview;
  constructor(private router: Router) {}
  userReviews: UserReview[] = [
    {
      id: 1,
      productName: 'iPhone 15 Pro',
      reviewerName: 'Alice Johnson',
      status: ReviewStatus.Approved,
      rating: 5,
      date: new Date('2025-09-01'),
    },
    {
      id: 2,
      productName: 'Samsung Galaxy S24',
      reviewerName: 'Michael Smith',
      status: ReviewStatus.Pending,
      rating: 4,
      date: new Date('2025-09-10'),
    },
    {
      id: 3,
      productName: 'Nike Air Max',
      reviewerName: 'Sophia Williams',
      status: ReviewStatus.Rejected,
      rating: 2,
      date: new Date('2025-09-15'),
    },
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

    this.userReviews = this.userReviews.filter(
      (item) => !selectedData.some((sel) => sel.id === item.id)
    );

    this.dataGrid.instance.clearSelection();
  };

  onRowClick($event: any) {
    console.log('reree', $event.data);
    this.selectedReview = $event.data;
    // this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/product/review/edit/${this.selectedReview.id}`]);
  }

  getStatusClass(status: ReviewStatus): string {
    switch (status) {
      case ReviewStatus.Approved:
        return 'status-approved';
      case ReviewStatus.Pending:
        return 'status-pending';
      case ReviewStatus.Rejected:
        return 'status-rejected';
      default:
        return '';
    }
  }
}
