import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;
  selectedImages: any[] = [];
  placeholderImage: string =
    '../../../../../../../assets/imagis/download-file-image.png';
  isImageLoaded: boolean = false;
  isClicked: boolean = false;
  isEditable: boolean = false;
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      metaTitle: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      categories: new FormControl('', Validators.required),
      enabled: new FormControl('', Validators.required),
      metaDescription: new FormControl('', Validators.required),
      availability: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('idd', id);
      if (id) {
        //to do to get items for editing
        this.isEditable = true;
      }
    });
  }

  displayFileManager() {
    this.isClicked = true;
    const dialogRef = this.dialog.open(FileManagerComponent, {
      height: '80%',
      data: {
        title: 'File Manager',
        isDialog: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedImages.push(result);
        this.isImageLoaded = true;
        this.productForm.get('image')?.setValue(this.selectedImages);
      }
      console.log('dialog selected', this.selectedImages);
    });
  }

  removeImage($event: MouseEvent, imageId: number) {
    $event.stopPropagation();
    this.isImageLoaded = false;
    this.selectedImages = this.selectedImages.filter(
      (item) => item.id !== imageId
    );
    console.log('dialog selected', this.selectedImages);
    //this.selectedImages = null;
    this.productForm.get('image')?.reset();
  }

  cities = [
    { id: 1, name: 'New York' },
    { id: 2, name: 'London' },
    { id: 3, name: 'Tokyo' },
  ];

  selectedCity: number | null = null;

  onSubmit() {
    console.log('product', this.productForm.value);
  }
}
