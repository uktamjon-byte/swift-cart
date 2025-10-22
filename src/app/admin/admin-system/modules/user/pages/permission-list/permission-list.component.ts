import { Component, OnInit, ViewChild } from '@angular/core';
import { IPermission } from '../../types/interfaces/user.interface';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.scss'],
})
export class PermissionListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedPermission!: IPermission;
  constructor(private router: Router) {}

  permissions: IPermission[] = [
    {
      id: 1,
      name: 'View Users',
      description: 'Allows viewing the list of users and their profiles.',
      code: 4,
      createdDate: new Date('2025-01-01T10:00:00Z'),
      updatedDate: new Date('2025-01-05T12:00:00Z'),
    },
    {
      id: 2,
      name: 'Edit Users',
      description: 'Grants permission to modify user details.',
      code: 6,
      createdDate: new Date('2025-01-02T09:30:00Z'),
      updatedDate: new Date('2025-01-06T14:00:00Z'),
    },
    {
      id: 3,
      name: 'Delete Users',
      description: 'Allows deleting user accounts from the system.',
      code: 3,
      createdDate: new Date('2025-01-03T08:45:00Z'),
      updatedDate: new Date('2025-01-07T16:20:00Z'),
    },
    {
      id: 4,
      name: 'Manage Roles',
      description: 'Enables managing roles and assigning permissions.',
      code: 2,
      createdDate: new Date('2025-01-04T11:15:00Z'),
      updatedDate: new Date('2025-01-08T10:40:00Z'),
    },
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
    console.log('reree');
    this.selectedPermission = $event.data;
    // this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([
      `/users/permissions/edit/${this.selectedPermission.id}`,
    ]);
  }
}
