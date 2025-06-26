import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {
adminLoginForm:FormGroup;
 passwordType:string = 'password';
showBackDrop: any;
  constructor() { 
       this.adminLoginForm = new FormGroup({
            'email': new FormControl('', [Validators.required, Validators.email]),
            'password': new FormControl('', [Validators.required, Validators.minLength(6)])
         });
  }

  ngOnInit(): void {
  }

  onSubmit(){

  }
}
