import { HttpClient } from "@angular/common/http";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { map, delay, takeUntil } from "rxjs/operators";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  public accessDenied = new BehaviorSubject<boolean>(false);
  public destroy$ = new Subject<void>();

  getUserByEmail(name: string) {
    return this.http.get(`http://localhost:3000/users?email=${name}`).pipe(
      map((data: any) => (data[0] ? data[0] : undefined)),
      delay(3000),
      takeUntil(this.destroy$) // Automatically unsubscribe when destroy$ emits
    );
  }

  
}
