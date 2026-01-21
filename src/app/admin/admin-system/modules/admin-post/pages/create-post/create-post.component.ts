import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostMode } from '../../types/enums/post.enum';
import { PostBlogService } from '../../service/post.service';
import { MatDialog } from '@angular/material/dialog';
import { constants } from 'src/app/constants/constants';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { TagService } from '../../service/tag.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { IAdminPost, ITag } from '../../types/interfaces/post.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  postForm: FormGroup;
  postMode!: PostMode;
  mainTitle = null;
  postId: number = 0;
  isEdit: boolean = false;
  isSaving: boolean = false;
  tags: ITag[] = [];
  private destroy$ = new Subject<void>();
  selectedImage: string =
    '../../../../../../../assets/imagis/download-file-image.png';
  isImageLoaded: boolean = false;
  editablePost!: IAdminPost;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostBlogService,
    private dialog: MatDialog,
    private notifyServiceMessage: NotifyServiceMessage,
    private adminService: AdminService,
    private tagService: TagService
  ) {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageId: new FormControl(''),
      isActive: new FormControl('', Validators.required),
      tagIds: new FormControl([], Validators.required),
    });
  }
  items = [
    { id: 1, title: 'Angular' },
    { id: 2, title: 'JS' },
    { id: 3, title: 'Web Socket' },
  ];

  selectedItems!: ITag[];
  @ViewChild('fileManager') fileManager!: FileManagerComponent;
  ngOnInit(): void {
    this.tagService
      .getTags()
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading tags, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.tags = res.data;
          console.log('gettags', this.tags);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to upload tags',
            NotifyMessageType.error
          );
        }
      });
    const mode = this.route.snapshot.data['mode'];
    switch (mode) {
      case PostMode.createPost:
        this.postMode = PostMode.createPost;
        this.mainTitle = this.route.snapshot.data['title'];
        break;

      case PostMode.editPost:
        this.postMode = PostMode.editPost;
        this.isEdit = true;
        this.mainTitle = this.route.snapshot.data['title'];
        this.route.params.subscribe((params) => {
          this.postId = +params['id'];
          this.postService.postsSubject
            .pipe(
              takeUntil(this.destroy$),
              catchError((e) => {
                this.notifyServiceMessage.opeSnackBar(
                  'Something went wrong while editing post, please try again later',
                  NotifyMessageType.error
                );
                return EMPTY;
              })
            )
            .subscribe((res) => {
              const post = res.find((p) => p.id === this.postId);
              if (post) {
                console.log('editable post', post);
                this.editablePost = post;
                this.selectedImage = this.getUrl + post.blogImage.uniqueName;
                this.isImageLoaded = true;
                //this.selectedItems = post.tags;
                this.postForm.patchValue({
                  title: this.editablePost.title,
                  description: this.editablePost.description,
                  isActive: this.editablePost.isActive,
                  imageId: this.editablePost.blogImage?.id,
                  tagIds: post.tags.map((tag) => tag.id),
                });
              }
            });
        });
        break;
    }
  }
  get getUrl() {
    return constants.baseUrlServer;
  }

  displayFileManager() {
    this.postService.isFileManagerActive.next(true);
    const dialogRef = this.dialog.open(FileManagerComponent, {
      height: '80%',
      data: {
        title: 'File Manager',
        isDialog: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedImage = this.getUrl + result.uniqueName;
        this.isImageLoaded = true;
        this.postForm.get('imageId')?.patchValue(result.id);
      }
    });
  }

  removeImage($event: MouseEvent) {
    $event.stopPropagation();
    this.isImageLoaded = false;
    this.selectedImage =
      '../../../../../../../assets/imagis/download-file-image.png';
    this.postForm.get('imageId')?.reset();
  }

  savePost() {
    console.log('clicked');
    this.isSaving = true;
    if (this.postMode === PostMode.createPost) {
      this.postService
        .postBlog(this.postForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError((e) => {
            this.adminService.stopLoader.next(true);
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong while creating post, please try again later',
              NotifyMessageType.error
            );
            return EMPTY;
          })
        )
        .subscribe((res) => {
          if (res.success) {
            this.notifyServiceMessage.opeSnackBar(
              'Blog post has been created successfully',
              NotifyMessageType.notify
            );
            this.postForm.reset();
            this.router.navigate(['/blog/post']);
          } else {
            this.notifyServiceMessage.opeSnackBar(
              'Failed to create post',
              NotifyMessageType.error
            );
          }
        });
    } else {
      console.log('edit post data', this.postForm.value);
      this.postService
        .updatePost(this.postId, this.postForm.value)
        .pipe(
          takeUntil(this.destroy$),
          catchError((e) => {
            this.adminService.stopLoader.next(true);
            this.notifyServiceMessage.opeSnackBar(
              'Something went wrong while editing post, please try again later',
              NotifyMessageType.error
            );
            return EMPTY;
          })
        )
        .subscribe((res) => {
          if (res.success) {
            this.notifyServiceMessage.opeSnackBar(
              'Blog post has been updated successfully',
              NotifyMessageType.notify
            );
            this.postForm.reset();
            this.router.navigate(['/blog/post']);
          } else {
            this.notifyServiceMessage.opeSnackBar(
              'Failed to update post',
              NotifyMessageType.error
            );
          }
        });
    }
  }

  cancel() {
    this.postForm.reset();
    this.router.navigate(['blog/post']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
