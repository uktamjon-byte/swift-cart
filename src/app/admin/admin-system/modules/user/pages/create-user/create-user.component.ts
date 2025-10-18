import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userForm!: FormGroup;
  passwordType: string = 'password';
  isImageSelected: boolean = false;
  id: number | null = null;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      roles: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      comfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      image: new FormControl(null, Validators.required),
      status: new FormControl(false, Validators.requiredTrue),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        //this.isEdit = true;
        console.log('edit category');
      } else {
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const control = this.userForm.get('image');

    if (input.files && input.files.length > 0) {
      this.isImageSelected = true;
      console.log('file', input.files);
      const file = input.files[0];
      this.userForm.patchValue({ image: file });
      this.userForm.get('image')?.updateValueAndValidity();
    }
  }

  onFileBlur(): void {
    // also mark as touched if user focuses and leaves without choosing file
    this.userForm.get('image')?.markAsTouched();
  }

  removeImage() {
    this.isImageSelected = false;
    this.userForm.patchValue({ image: null });
    this.userForm.get('image')?.markAsTouched();
    this.userForm.get('image')?.updateValueAndValidity();

    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit() {
    console.log('data', this.userForm.value);
  }
}
