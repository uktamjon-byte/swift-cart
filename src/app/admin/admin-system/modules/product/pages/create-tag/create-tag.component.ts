import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.scss'],
})
export class CreateTagComponent implements OnInit {
  tagForm!: FormGroup;
  id: number | null = null;
  isEdit: boolean = false;
  title: string = 'createTag';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tagForm = new FormGroup({
      title: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        this.title = 'editTag';
        console.log('edit category');
      } else {
      }
    });
  }

  onSubmit() {}
}
