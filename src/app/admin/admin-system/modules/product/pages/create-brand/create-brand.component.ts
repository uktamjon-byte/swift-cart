import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { catchError, EMPTY, pipe, Subject, takeUntil } from 'rxjs';
import { IBrand, IBrandDetail } from '../../types/interfaces/product.interface';
import { constants } from 'src/app/constants/constants';
import { BrandService } from '../../services/brand.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss'],
})
export class CreateBrandComponent implements OnInit, OnDestroy {
  brandForm!: FormGroup;
  id: number | null = null;
  isEdit: boolean = false;
  title: string = 'createBrand';
  imageLink: string | null = null;
  isSaving: boolean = false;
  defaultImage: string =
    '../../../../../../../assets/imagis/download-file-image.png';
  imgLoaded: Boolean = false;
  editableBrand!: IBrandDetail;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    private brandService: BrandService,
    private adminService: AdminService,
    private notifyServiceMessage: NotifyServiceMessage
  ) {}

  ngOnInit(): void {
    this.brandForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.required),
      imageId: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        this.title = 'editBrand';
        this.brandService
          .getBrandById(this.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong while editing brand, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res) {
              this.editableBrand = res.data;
              this.imageLink = res.data.brandImage.uniqueName;
              this.imgLoaded = true;
              this.brandForm.patchValue({
                name: this.editableBrand.name,
                description: this.editableBrand.description,
                isActive: this.editableBrand.isActive,
                imageId: this.editableBrand.imageId,
              });
            }
          });
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
        this.imageLink = result.uniqueName;
        this.brandForm.get('imageId')?.setValue(result.id);
        this.imgLoaded = true;
      }
    });
  }

  get getUrl() {
    return this.imgLoaded
      ? constants.baseUrlServer + this.imageLink
      : this.defaultImage;
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
      if (src && src !== this.defaultImage) {
        this.imgLoaded = true;
      }
    }
  }

  saveBrand() {
    this.isSaving = true;
    if (!this.isEdit) {
      this.createBrand(this.brandForm.value);
    } else {
      this.editBrand(this.id, this.brandForm.value);
    }
  }

  createBrand(data: IBrand) {
    this.brandService
      .postBrand(data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while creating brand, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Brand has been created successfully',
            NotifyMessageType.notify
          );
          this.brandForm.reset();
          this.router.navigate(['/admin/product/brand']);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to create brand',
            NotifyMessageType.error
          );
        }
      });
  }

  editBrand(id: number | null, data: IBrand) {
    this.brandService
      .updateBrand(id, data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while updating brand, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Brand has been edited successfully',
            NotifyMessageType.notify
          );
          this.brandForm.reset();
          this.router.navigate(['/admin/product/brand']);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to edit brand',
            NotifyMessageType.error
          );
        }
      });
  }

  cancel() {
    this.brandForm.reset();
    this.router.navigate(['/admin/users/permissions']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
