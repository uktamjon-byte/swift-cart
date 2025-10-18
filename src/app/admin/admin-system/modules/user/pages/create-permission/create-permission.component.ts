import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-permission',
  templateUrl: './create-permission.component.html',
  styleUrls: ['./create-permission.component.scss'],
})
export class CreatePermissionComponent implements OnInit {
  permissionForm!: FormGroup;
  mainTitle: string = 'createPermission';
  id: number | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.permissionForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.mainTitle = 'editPermission';
        console.log('edit category');
      } else {
      }
    });
  }

  onSubmit() {}
}
