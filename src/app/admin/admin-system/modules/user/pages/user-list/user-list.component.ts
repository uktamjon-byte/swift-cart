import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { User } from '../../types/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  collapsed = false;
  @ViewChild('grid', { static: false }) dataGrid!: DxDataGridComponent;
  selectedUser!: User;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  users: User[] = [
    {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      createdDate: new Date('2025-01-10'),
    },
    {
      id: 2,
      name: 'Anna',
      lastName: 'Smith',
      email: 'anna.smith@example.com',
      createdDate: new Date('2025-02-14'),
    },
    {
      id: 3,
      name: 'David',
      lastName: 'Johnson',
      email: 'david.johnson@example.com',
      createdDate: new Date('2025-03-21'),
    },
  ];

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
    this.selectedUser = $event.data;
    // this.postBlogService.setPost(this.selectedPost);
    this.router.navigate([`/users/edit/${this.selectedUser.id}`]);
  }
}
