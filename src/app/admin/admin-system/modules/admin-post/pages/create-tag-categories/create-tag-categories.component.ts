import { Component, OnInit } from '@angular/core';
import { PostBlogService } from '../services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ComponentMode } from '../../types/enums/post.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-tag-categories',
  templateUrl: './create-tag-categories.component.html',
  styleUrls: ['./create-tag-categories.component.scss'],
})
export class CreateTagCategoriesComponent implements OnInit {
  editablePost: any;
  categoryTagForm: FormGroup;
  mode!: ComponentMode;
  categoryId!: string;
  tagId!: string;
  componentTitle = null;
  buttonText = null;
  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.categoryTagForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'];
    this.applyModeTranslations(mode);
    this.translate.onLangChange.subscribe(() => {
      this.applyModeTranslations(mode);
    });
  }

  private applyModeTranslations(mode: ComponentMode) {
    switch (mode) {
      case ComponentMode.createCategory:
        this.setLocalizedTexts('postCategoryCreateBtn', 'postCategoryCreate');
        break;
      case ComponentMode.editCategory:
        this.setLocalizedTexts('postCategoryEditBtn', 'postCategoryEdit');
        this.setCategoryIdFromParams();
        break;
      case ComponentMode.createTag:
        this.setLocalizedTexts('postTagCreateBtn', 'postTagCreate');
        break;
      case ComponentMode.editTag:
        this.setLocalizedTexts('postTagEditBtn', 'postTagEdit');
        this.setTagIdFromParams();
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

  private setCategoryIdFromParams() {
    this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
    });
  }

  private setTagIdFromParams() {
    this.route.params.subscribe((params) => {
      this.tagId = params['id'];
    });
  }

  onSubmit() {}
}
