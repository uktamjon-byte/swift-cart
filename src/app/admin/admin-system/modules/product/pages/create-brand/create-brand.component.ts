import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss'],
})
export class CreateBrandComponent implements OnInit {
  brandForm!: FormGroup;
  id: number | null = null;
  isEdit: boolean = false;
  title: string = 'createBrand';
  imageLink: string | null = null;
  placeholderImage: string =
    '../../../../../../../assets/imagis/download-file-image.png';
  imgLoaded: Boolean = false;
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.brandForm = new FormGroup({
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
        this.title = 'editBrand';
        console.log('edit category');
      } else {
      }
    });
  }

  uploadImage() {
    const dialogRef = this.dialog.open(FileManagerComponent, {
      height: '80%',
      data: {
        title: 'File Manager',
        isDialog: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.imageLink = result.image;
        console.log('result', this.imageLink);
        this.brandForm.get('logoImage')?.setValue(result);
        this.imgLoaded = false;
      }
    });
  }

  clearImageArea(imageType: boolean) {
    if (imageType) {
      this.brandForm.get('logoImage')?.reset();
      this.brandForm.get('logoImage')?.markAsTouched();
      this.imgLoaded = false;
      this.imageLink = '';
    }
  }

  onImageLoad(src: string | null, contentType: boolean) {
    if (contentType) {
      if (src && src !== this.placeholderImage) {
        this.imgLoaded = true;
      }
    }
  }

  onSubmit() {
    console.log('value', this.brandForm.value);
  }
}
