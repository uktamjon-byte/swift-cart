import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";


@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  public toggleSidebar = new BehaviorSubject<boolean>(false);
  
}

