import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AdminLoginService } from './admin/admin-auth/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private loginService: AdminLoginService
  ) {
    const storedLang = localStorage.getItem('lang') || 'eng';
    translate.setDefaultLang('eng');
    translate.use(storedLang);
  }
  ngOnInit() {
    const perms = JSON.parse(localStorage.getItem('userPermissions') || '[]');
    console.log('permiss', perms);
    this.loginService.permissions$.next(perms);
  }

  title = 'ang-swift-cart';
}
