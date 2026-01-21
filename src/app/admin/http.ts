import { HttpBackend, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(handler: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(handler));
}
