import { Component, OnInit, ViewChild } from '@angular/core';
import { event } from 'devextreme/events';
import { FileManagerComponent } from '../../../shared/components/file-manager/file-manager.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostMode } from '../../types/enums/post.enum';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  postMode!: PostMode;
  mainTitle = null;
  postId: number = 0;
  constructor(private route: ActivatedRoute) {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      metaTitle: new FormControl('', Validators.required),
      metaDescription: new FormControl('', Validators.required),
      image: new FormControl(''),
      publishStatus: new FormControl('', Validators.required),
      postCategory: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
    });
  }
  editorValue: string = 'Text Editor';

  blogCategories = [
    { id: 1, title: 'companyUpdates' },
    { id: 2, title: 'guidesTutorials' },
    { id: 3, title: 'news' },
    { id: 4, title: 'promotions' },
    { id: 5, title: 'shoppingTips' },
    { id: 6, title: 'testimonials' },
  ];

  items = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'Angular' },
    { id: 3, name: 'React' },
    { id: 4, name: 'Vue' },
    { id: 5, name: 'Svelte' },
  ];

  selectedItems = [2, 4]; // Pre-selected values (Angular, Vue)
  @ViewChild('fileManager') fileManager!: FileManagerComponent;
  ngOnInit(): void {
    const mode = this.route.snapshot.data['mode'];
    switch (mode) {
      case PostMode.createPost:
        this.mainTitle = this.route.snapshot.data['title'];
        break;

      case PostMode.editPost:
        this.mainTitle = this.route.snapshot.data['title'];
        this.route.params.subscribe((params) => {
          this.postId = params['id'];
          console.log('ID from query params:', this.postId);
        });
        break;
    }
  }

  displayFileManager() {}

  handleFile() {}

  onSubmit() {
    console.log('postform', this.postForm.value);
  }
}
