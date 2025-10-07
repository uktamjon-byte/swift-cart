import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  imageLink1: string | null = null;
  imageLink2: string | null = null;
  placeholderImage1: string =
    '../../../../../../../assets/imagis/download-file-image.png';
  placeholderImage2: string =
    '../../../../../../../assets/imagis/image-placeholder2.png';

  imgLoaded1: Boolean = false;
  imgLoaded2: Boolean = false;
  title: string = 'createCategory';
  id: number | null = null;
  isEdit: boolean = false;
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      title: new FormControl('', Validators.required),
      status: new FormControl(''),
      description: new FormControl('', Validators.required),
      logoImage: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        this.title = 'editCategory';
        console.log('edit category');
      } else {
      }
    });
  }

  uploadImage(contentType: boolean) {
    const dialogRef = this.dialog.open(FileManagerComponent, {
      height: '80%',
      data: {
        title: 'File Manager',
        isDialog: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('dialog selected', result);
        if (contentType) {
          console.log('isload', this.imgLoaded1);
          this.imageLink1 = result.image;
          console.log('result', this.imageLink1);
          this.categoryForm.get('logoImage')?.setValue(result);
          this.imgLoaded1 = false;
        }
      }
    });
  }

  clearImageArea(imageType: boolean) {
    if (imageType) {
      this.categoryForm.get('logoImage')?.reset();
      this.categoryForm.get('logoImage')?.markAsTouched();
      this.imgLoaded1 = false;
      this.imageLink1 = '';
    }
  }

  onImageLoad(src: string | null, contentType: boolean) {
    if (contentType) {
      if (src && src !== this.placeholderImage1) {
        this.imgLoaded1 = true;
      }
    }
  }

  onSubmit() {
    console.log('value', this.categoryForm.value);
  }
}
