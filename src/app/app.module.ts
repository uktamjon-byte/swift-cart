import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './shared/components/shared-module';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { setupTranslateFactory } from './store/system/core/services/system.service';
import { HttpLoaderFactory } from './store/auth/auth.module';

import {
  DropzoneModule,
  DROPZONE_CONFIG,
  DropzoneConfigInterface,
} from 'ngx-dropzone-wrapper';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { NotifyServiceMessage } from './shared/services/notify.service';
import { SaveEditToolbarComponent } from './shared/components/save-edit-toolbar/save-edit-toolbar.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: '/api/upload', // <-- your backend endpoint
  maxFilesize: 10, // MB
  acceptedFiles: 'image/*,application/pdf',
  addRemoveLinks: true,
  parallelUploads: 3,
  uploadMultiple: false,
  autoProcessQueue: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    SharedModule,
    TranslateModule,
    DropzoneModule,
    BreadcrumbModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG },
    NotifyServiceMessage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
