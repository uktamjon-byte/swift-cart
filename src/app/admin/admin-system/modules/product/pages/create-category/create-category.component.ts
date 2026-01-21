import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';

import { CategoryService } from '../../services/category.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';

import {
  ICategoryDetail,
  IProductCategory,
} from '../../types/interfaces/product.interface';
import { constants } from 'src/app/constants/constants';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  imageLink1: string | null = null;
  imageLink2: string | null = null;
  defaultImage1: string =
    '../../../../../../../assets/imagis/download-file-image.png';
  placeholderImage2: string =
    '../../../../../../../assets/imagis/image-placeholder2.png';

  imgLoaded1: Boolean = false;
  imgLoaded2: Boolean = false;
  title: string = 'createCategory';
  id: number | null = null;
  isEdit: boolean = false;
  private destroy$ = new Subject<void>();
  isSaving: boolean = false;
  editableCategory!: ICategoryDetail;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private notifyServiceMessage: NotifyServiceMessage,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.required),
      imageId: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        this.title = 'editCategory';
        this.categoryService
          .getCategoryById(this.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong while editing category, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res) {
              this.editableCategory = res.data;
              this.imageLink1 = res.data.categoryImage.uniqueName;
              this.imgLoaded1 = true;
              this.categoryForm.patchValue({
                name: this.editableCategory.name,
                description: this.editableCategory.description,
                isActive: this.editableCategory.isActive,
                imageId: this.editableCategory.imageId,
              });
            }
          });
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
        if (contentType) {
          this.imageLink1 = result.uniqueName;
          console.log('result', this.imageLink1);
          this.categoryForm.get('imageId')?.patchValue(result.id);
          this.imgLoaded1 = true;
        }
      }
    });
  }

  get getUrl() {
    return this.imgLoaded1
      ? constants.baseUrlServer + this.imageLink1
      : this.defaultImage1;
  }

  clearImageArea(imageType: boolean) {
    if (imageType) {
      this.categoryForm.get('imageId')?.reset();
      this.categoryForm.get('imageId')?.markAsTouched();
      this.imgLoaded1 = false;
      this.imageLink1 = '';
    }
  }

  onImageLoad(src: string | null, contentType: boolean) {
    if (contentType) {
      if (src && src !== this.defaultImage1) {
        this.imgLoaded1 = true;
      }
    }
  }

  saveCategory() {
    this.isSaving = true;
    if (!this.isEdit) {
      this.createCategory(this.categoryForm.value);
    } else {
      this.editBrand(this.id, this.categoryForm.value);
    }
  }

  createCategory(data: IProductCategory) {
    this.categoryService
      .postCategory(data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while creating category, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log('res', res);
        if (res.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Category has been created successfully',
            NotifyMessageType.notify
          );
          this.categoryForm.reset();
          this.router.navigate(['/admin/product/categories']);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to create category',
            NotifyMessageType.error
          );
        }
      });
  }

  editBrand(id: number | null, data: IProductCategory) {
    this.categoryService
      .updateCategory(id, data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while updating category, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log('res', res);
        if (res.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Category has been edited successfully',
            NotifyMessageType.notify
          );
          this.categoryForm.reset();
          this.router.navigate(['/admin/product/categories']);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to edit category',
            NotifyMessageType.error
          );
        }
      });
  }

  cancel() {
    this.categoryForm.reset();
    this.router.navigate(['/admin/product/categories']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
