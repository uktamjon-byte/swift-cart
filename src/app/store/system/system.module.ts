import { NgModule } from '@angular/core';
import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SystemService } from './core/services/system.service';
import { StickyDirective } from './core/directives/sticky.directive';
import { FooterComponent } from '../system/core/components/footer/footer.component';
import { BottomNavigationComponent } from './core/components/bottom-navigation/bottom-navigation.component';
import { ResCategorySidebarComponent } from './core/components/res-category-sidebar/res-category-sidebar.component';
import { ResSwitchlangCanvasComponent } from './core/components/res-switchlang-canvas/res-switchlang-canvas.component';
import { SearchInputResComponent } from './core/components/search-input-res/search-input-res.component';
import { SearchInputComponent } from './core/components/search-input/search-input.component';
import { SharedModule } from 'src/app/shared/components/shared-module';
import { ScrollTopDirective } from './core/directives/scroll-top.directive';
import { PageSharedModule } from './modules/shared/page-shared.module';





export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    SystemComponent,
    HeaderComponent,
    StickyDirective,
    ScrollTopDirective,
    FooterComponent,
       BottomNavigationComponent,
        SearchInputComponent,
        SearchInputResComponent,
        ResCategorySidebarComponent,
        ResSwitchlangCanvasComponent,
        
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    HttpClientModule,
    PageSharedModule,
    TranslateModule.forRoot({
              loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
              },
            }),
  ],
  providers: [
    SystemService
  ]
})
export class SystemModule { }