import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map, delay, takeUntil } from "rxjs/operators";

@Injectable()
export class SystemService {
  constructor(private http: HttpClient) {}

  public activeInputBacdrop = new BehaviorSubject<boolean>(false);
  public activeInputResBackdrop = new BehaviorSubject<boolean>(false);
  public triggerSidebar = new BehaviorSubject<boolean>(false);
  public triggerBottomTab = new BehaviorSubject<boolean>(false);
  
}

export function setupTranslateFactory(
  translate: TranslateService
): () => Promise<any> {
  return () => {
    const defaultLang = 'eng';
    const savedLang = localStorage.getItem('lang') || defaultLang;

    translate.setDefaultLang(defaultLang);
    return translate.use(savedLang).toPromise();
  };
}
