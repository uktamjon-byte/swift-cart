import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
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
