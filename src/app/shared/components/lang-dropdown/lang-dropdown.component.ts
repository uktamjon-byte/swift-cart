import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.scss']
})
export class LangDropdownComponent implements OnInit {

  lang:string = '';
  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'eng'
  }

  changeLang($event:any){
    const selectedLang = $event.target.value;
    localStorage.setItem('lang', selectedLang);
    this.translateService.use(selectedLang);
    console.log('lang', selectedLang)
  }

}
