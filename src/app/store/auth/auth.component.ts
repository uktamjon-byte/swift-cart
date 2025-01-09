import { Component, NgZone, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  //isVisibile:boolean = false;

  constructor(private ngZone:NgZone, private translateService:TranslateService) {
    this.translateService.setDefaultLang('eng');
    this.translateService.use(localStorage.getItem('lang') || 'eng')
   }

  ngOnInit(){
    this.ngZone.runOutsideAngular(() => {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipTriggerList.forEach(tooltipTriggerEl => {
        new bootstrap.Tooltip(tooltipTriggerEl, {
          placement: 'top'
        });
      });
    });
  }

}
