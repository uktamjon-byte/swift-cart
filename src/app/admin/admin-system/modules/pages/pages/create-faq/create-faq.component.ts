import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.scss'],
})
export class CreateFaqComponent implements OnInit {
  faqForm!: FormGroup;
  id: number | null = null;
  mainTitle: string = 'createFaq';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.faqForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      isActive: new FormControl(false, Validators.requiredTrue),
    });

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log('category id', this.id);
      if (this.id !== null && !isNaN(this.id)) {
        this.mainTitle = 'editFaq';
        console.log('edit category');
      } else {
      }
    });
  }

  onSubmit() {
    console.log('usss', this.faqForm.value);
  }
}
