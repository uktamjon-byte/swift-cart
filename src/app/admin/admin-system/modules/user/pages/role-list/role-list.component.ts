import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { IRole } from '../../types/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  collapsed = false;
  selectedRole!: IRole;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  constructor(private router: Router) {}

  roles: IRole[] = [
    {
      id: 1,
      name: 'Admin',
      description: 'Has full access to all system features and settings.',
      permissions: [
        {
          id: 1,
          name: 'View Users',
          description: 'Can view all registered users.',
          code: 1001,
        },
        {
          id: 2,
          name: 'Edit Users',
          description: 'Can edit user profiles and settings.',
          code: 1002,
        },
        {
          id: 3,
          name: 'Delete Users',
          description: 'Can permanently remove users from the system.',
          code: 1003,
        },
        {
          id: 4,
          name: 'Manage Roles',
          description:
            'Can create, edit, or delete roles and their permissions.',
          code: 1004,
        },
      ],
    },
    {
      id: 2,
      name: 'Editor',
      description: 'Can manage and edit content but has limited user access.',
      permissions: [
        {
          id: 5,
          name: 'View Users',
          description: 'Can see user list but not edit it.',
          code: 1001,
        },
        {
          id: 6,
          name: 'Edit Content',
          description: 'Can modify and update website content.',
          code: 2001,
        },
      ],
    },
    {
      id: 3,
      name: 'Viewer',
      description: 'Can only view content and reports without making changes.',
      permissions: [
        {
          id: 7,
          name: 'View Dashboard',
          description: 'Can access and view dashboard analytics.',
          code: 3001,
        },
        {
          id: 8,
          name: 'View Reports',
          description: 'Can view generated reports.',
          code: 3002,
        },
      ],
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
    this.selectedRole = $event.data;
    this.router.navigate([`/users/roles/edit/${this.selectedRole.id}`]);
  }
}
