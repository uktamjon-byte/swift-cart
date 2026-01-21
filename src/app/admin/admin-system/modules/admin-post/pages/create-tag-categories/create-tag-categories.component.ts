import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostBlogService } from '../../service/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentMode } from '../../types/enums/post.enum';
import { TranslateService } from '@ngx-translate/core';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { TagService } from '../../service/tag.service';
import { catchError, EMPTY, finalize, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { ITag } from '../../types/interfaces/post.interface';

@Component({
  selector: 'app-create-tag-categories',
  templateUrl: './create-tag-categories.component.html',
  styleUrls: ['./create-tag-categories.component.scss'],
})
export class CreateTagCategoriesComponent implements OnInit, OnDestroy {
  editablePost: any;
  categoryTagForm: FormGroup;
  mode!: ComponentMode;
  categoryId!: number;
  tagId!: number;
  componentTitle = null;
  buttonText = null;
  isEdit: boolean = false;
  isSaving: boolean = false;
  editableTag!: ITag;
  private destroy$ = new Subject<void>();
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private notifyServiceMessage: NotifyServiceMessage,
    private adminService: AdminService,
    private tagService: TagService
  ) {
    this.categoryTagForm = new FormGroup({
      title: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.required),
    });
  }

  ngOnInit(): void {
    this.mode = this.route.snapshot.data['mode'];
    this.applyModeTranslations(this.mode);
    this.translate.onLangChange.subscribe(() => {
      this.applyModeTranslations(this.mode);
    });
  }

  private applyModeTranslations(mode: ComponentMode) {
    switch (mode) {
      case ComponentMode.createTag:
        this.setLocalizedTexts('postTagCreateBtn', 'postTagCreate');
        break;
      case ComponentMode.editTag:
        this.setLocalizedTexts('postTagEditBtn', 'postTagEdit');
        this.setTagIdFromParams();
        this.isEdit = true;
        break;
    }
  }

  private setLocalizedTexts(btnKey: string, titleKey: string) {
    this.translate.get(btnKey).subscribe((translated) => {
      this.buttonText = translated;
    });

    this.translate.get(titleKey).subscribe((translated) => {
      this.componentTitle = translated;
    });
  }

  private setTagIdFromParams() {
    this.route.params.subscribe((params) => {
      this.tagId = +params['id'];
      this.tagService
        .getTagById(this.tagId)
        .pipe(
          takeUntil(this.destroy$),
          catchError((e) => {
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong, please try again later',
              NotifyMessageType.error
            );
            return EMPTY;
          })
        )
        .subscribe((res) => {
          if (res.data.id === this.tagId) this.editableTag = res.data;
          this.categoryTagForm.patchValue({
            title: this.editableTag?.title,
            isActive: this.editableTag?.isActive,
          });
        });
    });
  }

  saveTagCategory() {
    this.isSaving = true;
    switch (this.mode) {
      case ComponentMode.createTag:
        this.tagService
          .postTag(this.categoryTagForm.value)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.adminService.stopLoader.next(true);
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res.success) {
              setTimeout(() => {
                this.notifyServiceMessage.opeSnackBar(
                  'New tag has been created successfully',
                  NotifyMessageType.notify
                );
                this.categoryTagForm.reset();
                this.router.navigate(['/blog/tag']);
              }, 3000);
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to create',
                NotifyMessageType.error
              );
            }
          });
        break;
      case ComponentMode.editTag:
        this.tagService
          .updateTag(this.tagId, this.categoryTagForm.value)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              this.adminService.stopLoader.next(true);
              this.notifyServiceMessage.opeSnackBar(
                'Something went wrong, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            console.log('res', res);
            if (res.success) {
              setTimeout(() => {
                this.notifyServiceMessage.opeSnackBar(
                  'Tag has been updated successfully',
                  NotifyMessageType.notify
                );
                this.categoryTagForm.reset();
                this.router.navigate(['/admin/blog/tag']);
              }, 3000);
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Failed to update',
                NotifyMessageType.error
              );
            }
          });
        break;
    }
  }

  cancel() {
    this.categoryTagForm.reset();
    this.router.navigate(['/admin/blog/tag']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
