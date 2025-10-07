import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss'],
})
export class EditReviewComponent implements OnInit {
  reviewForm!: FormGroup;
  id: number | null = null;
  isEdit: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.reviewForm = new FormGroup({
      rating: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      logoImage: new FormControl('', Validators.required),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.isEdit = true;
        console.log('edit category');
      } else {
      }
    });
  }

  onSubmit() {
    console.log('review form', this.reviewForm.value);
  }
}
