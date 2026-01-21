import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyServiceMessage } from 'src/app/shared/services/notify.service';
import { FaqService } from '../../services/faq.service';
import { catchError, EMPTY, Subject, takeUntil } from 'rxjs';
import { IFaq } from '../../types/interfaces/pages.interface';
import { NotifyMessageType } from 'src/app/shared/enums/notify.enum';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.scss'],
})
export class CreateFaqComponent implements OnInit, OnDestroy {
  faqForm!: FormGroup;
  id: number | null = null;
  mainTitle: string = 'createFaq';
  private destroy$ = new Subject<void>();
  editableFaq!: IFaq;
  isEdit: boolean = false;
  isSaving: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private notifyServiceMessage: NotifyServiceMessage,
    private faqService: FaqService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.faqForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        this.mainTitle = 'editFaq';
        this.faqService
          .getFaqById(this.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError((e) => {
              e.cancel = true;
              this.notifyServiceMessage.opeSnackBar(
                'Editable FAQ has not been uploaded, please try again later',
                NotifyMessageType.error
              );
              return EMPTY;
            })
          )
          .subscribe((res) => {
            if (res.data.id === this.id) {
              this.editableFaq = res.data;
            } else {
              this.notifyServiceMessage.opeSnackBar(
                'Editable FAQ has not been uploaded, please try again later',
                NotifyMessageType.error
              );
            }

            if (this.editableFaq) {
              this.faqForm.patchValue({
                title: this.editableFaq.title,
                description: this.editableFaq.description,
                isActive: this.editableFaq.isActive,
              });
            }
          });
      }
    });
  }

  saveFaq() {
    if (!this.isEdit) {
      this.createFaq(this.faqForm.value);
    } else {
      this.editFaq(this.faqForm.value, this.id);
    }
  }

  createFaq(data: IFaq) {
    this.isSaving = true;
    this.faqService
      .postFaq(data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while posting new faq, please try again later',
            NotifyMessageType.error
          );
          this.isSaving = false;
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (response.success) {
          this.notifyServiceMessage.opeSnackBar(
            'New faq has been created successfully',
            NotifyMessageType.notify
          );
          this.router.navigate(['/admin/pages/faq']);
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to post new faq',
            NotifyMessageType.error
          );
        }
      });
  }

  editFaq(data: IFaq, id: number | null) {
    this.isSaving = true;
    this.faqService
      .updateFaq(id, data)
      .pipe(
        takeUntil(this.destroy$),
        catchError((e) => {
          this.notifyServiceMessage.opeSnackBar(
            'Something went wrong while updating FAQ, please try again later',
            NotifyMessageType.error
          );
          this.isSaving = false;
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (response.success) {
          this.notifyServiceMessage.opeSnackBar(
            'FAQ has been updated successfully',
            NotifyMessageType.notify
          );
          this.router.navigate(['/admin/pages/faq']);
          this.faqForm.reset();
        } else {
          this.notifyServiceMessage.opeSnackBar(
            'Failed to update FAQ',
            NotifyMessageType.error
          );
        }
      });
  }

  cancel() {
    this.faqForm.reset();
    this.router.navigate(['/admin/pages/faq']);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
