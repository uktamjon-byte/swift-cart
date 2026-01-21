import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { PostCommentService } from '../../service/post-comments.service';
import { AdminService } from 'src/app/admin/admin-system/services/admin.service';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';
import { ICommentPostDetail } from '../../types/interfaces/post.interface';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss'],
})
export class EditCommentComponent implements OnInit, OnDestroy {
  commentForm!: FormGroup;
  isSaving: boolean = false;
  private destroy$ = new Subject<void>();
  id!: number;
  editableComment!: ICommentPostDetail;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postCommentService: PostCommentService,
    private notifyServiceMessage: NotifyServiceMessage,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
    this.commentForm = new FormGroup({
      author: new FormControl(''),
      email: new FormControl(''),
      message: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.required),
    });

    this.getCommentEditComment();
  }

  getCommentEditComment() {
    this.postCommentService
      .getCommentById(this.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while uploading editable comment, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.editableComment = res.data;
          this.commentForm.patchValue({
            author: this.editableComment?.author,
            email: this.editableComment?.email,
            message: this.editableComment?.message,
            isActive: this.editableComment?.isActive,
          });
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to upload comment',
            NotifyMessageType.error
          );
        }
      });
  }

  editComment() {
    const commentData = this.commentForm.value;
    const payload = {
      message: commentData.message,
      isActive: commentData.isActive,
    };
    this.postCommentService
      .updateComment(this.id, payload)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while editing comment, please try again later',
            NotifyMessageType.error
          );
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.commentForm.reset();
          this.router.navigate([`/admin/blog/post/comments/${this.id}`]);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to edit comment',
            NotifyMessageType.error
          );
        }
      });
  }

  cancel() {
    this.commentForm.reset();
    this.router.navigate(['/admin/blog/post/comments']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
