import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IPermission } from '../../types/interfaces/user.interface';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss'],
})
export class CreateRoleComponent implements OnInit {
  roleForm!: FormGroup;
  id: number | null = null;
  mainTitle: string = 'createRole';
  selectedPermissions: IPermission[] = [];
  constructor(private route: ActivatedRoute) {}
  permissions: IPermission[] = [
    {
      id: 1,
      code: 1001,
      name: 'View Users',
      description: 'Allows viewing the list of users',
    },
    {
      id: 2,
      code: 1002,
      name: 'Edit Users',
      description: 'Allows editing user details',
    },
    {
      id: 3,
      code: 1003,
      name: 'Delete Users',
      description: 'Allows deleting users from the system',
    },
    {
      id: 4,
      code: 1004,
      name: 'Create Users',
      description: 'Allows adding new users to the system',
    },
  ];

  ngOnInit(): void {
    this.roleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      permissions: new FormControl([], Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.mainTitle = 'editRole';
        console.log('edit category');
      } else {
      }
    });
  }

  selectboxOnChange(event: Event, permission: IPermission) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedPermissions.push(permission);
    } else {
      this.selectedPermissions = this.selectedPermissions.filter(
        (p) => p.id !== permission.id
      );
    }
    console.log('check', this.selectedPermissions);
  }

  selectAll(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.permissions.map((per) => this.selectedPermissions.push(per));
    } else {
      this.selectedPermissions = [];
    }
  }

  isSelected(permission: IPermission): boolean {
    return this.selectedPermissions.some((p) => p.id === permission.id);
  }

  onSubmit() {
    this.roleForm.get('permissions')?.setValue(this.selectedPermissions);
    console.log('form', this.roleForm.value);
  }
}
