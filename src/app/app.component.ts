import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  constructor(private translate: TranslateService) {
  const storedLang = localStorage.getItem('lang') || 'eng'; // Or your default language
  translate.setDefaultLang('eng');
  translate.use(storedLang);
}

  title = 'ang-swift-cart';
}
