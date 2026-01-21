import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { ProductService } from '../../services/product.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import {
  IBrand,
  IBrandDetail,
  ICategoryDetail,
  IProduct,
  IProductCategory,
  IProductDetail,
  IUnit,
} from '../../types/interfaces/product.interface';
import { constants } from 'src/app/constants/constants';
import { CategoryService } from '../../services/category.service';

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
  brands: IBrandDetail[] = [];
  categories: ICategoryDetail[] = [];
  units: IUnit[] = [];
  isSaving: boolean = false;
  id: number | null = null;
  private destroy$ = new Subject<void>();
  editableProduct!: IProductDetail;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private adminService: AdminService,
    private categoryService: CategoryService,
    private notifyServiceMessage: NotifyServiceMessage,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      metaTitle: new FormControl('', Validators.required),
      brandId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.required),
      metaDescription: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      images: new FormControl(''),
      unitId: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id) {
        this.isEditable = true;
        this.productService
          .getProductById(this.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong while editing product, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res) {
              this.editableProduct = res.data;
              this.selectedImages = res.data.images.map(
                (item: any) => item.productImages
              );
              this.isImageLoaded = true;
              this.productForm.patchValue({
                name: this.editableProduct.name,
                description: this.editableProduct.description,
                isActive: this.editableProduct.isActive,
                quantity: this.editableProduct.quantity,
                price: this.editableProduct.price,
                metaTitle: this.editableProduct.seo.title,
                metaDescription: this.editableProduct.seo.description,
                brandId: this.editableProduct.brandId,
                categoryId: this.editableProduct.categoryId,
                unitId: this.editableProduct.unitId,
                images: this.selectedImages.map((item: any) => item.id),
              });
            }
          });
      }
    });
    this.getBrands();
    this.getCategories();
    this.getUnits();
  }

  getBrands() {
    this.brandService
      .getBrands()
      .pipe(
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading brands, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.brands = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load brands',
            NotifyMessageType.error
          );
        }
      });
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .pipe(
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading categories, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.categories = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load categories',
            NotifyMessageType.error
          );
        }
      });
  }

  getUnits() {
    this.productService
      .getProductUnits()
      .pipe(
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading product units, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.units = res.data;
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to load product units',
            NotifyMessageType.error
          );
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
        const imageIds = this.selectedImages.map((img) => img.id);
        this.isImageLoaded = true;
        this.productForm.get('images')?.setValue(imageIds);
      }
    });
  }
  get getUrl() {
    return constants.baseUrlServer;
  }

  removeImage($event: MouseEvent, imageId: number) {
    $event.stopPropagation();
    this.selectedImages = this.selectedImages.filter(
      (item) => item.id !== imageId
    );
    if (this.selectedImages.length === 0) {
      this.isImageLoaded = false;
    }
  }

  saveProduct() {
    const formValue = this.productForm.value;

    const payload = {
      name: formValue.name,
      description: formValue.description,
      brandId: formValue.brandId,
      categoryId: formValue.categoryId,
      isActive: formValue.isActive,
      quantity: formValue.quantity,
      price: formValue.price,
      images: formValue.images,
      unitId: formValue.unitId,

      seo: {
        title: formValue.metaTitle,
        description: formValue.metaDescription,
      },
    };

    this.isSaving = true;
    if (!this.isEditable) {
      this.createProduct(payload);
    } else {
      this.editProduct(this.id, payload);
    }
  }

  createProduct(data: IProduct) {
    this.productService
      .postProduct(data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while creating product, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Product has been created successfully',
            NotifyMessageType.notify
          );
          this.productForm.reset();
          this.router.navigate(['/admin/product/list']);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to create product',
            NotifyMessageType.error
          );
        }
      });
  }

  editProduct(id: number | null, data: IProduct) {
    this.productService
      .updateProduct(id, data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.adminService.stopLoader.next(true);
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while updating product, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.success) {
          this.notifyServiceMessage.opeSnackBar(
            'Product has been edited successfully',
            NotifyMessageType.notify
          );
          this.productForm.reset();
          this.router.navigate(['/product/list']);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to edit product',
            NotifyMessageType.error
          );
        }
      });
  }

  cancel() {
    this.productForm.reset();
    this.router.navigate(['/admin/product/categories']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
