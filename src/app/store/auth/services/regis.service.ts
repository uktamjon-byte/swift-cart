import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {map, timeout, delay, takeUntil} from "rxjs/operators"
import { IRegis } from "../interfaces/auth.interface";

@Injectable()
export class RegisService{
   constructor(private http:HttpClient){}
   public accessDenied = new BehaviorSubject<boolean>(false);
   public destroy$ = new Subject<void>();
   postUser(userData:IRegis){
    return this.http.post('http://localhost:3000/groups',userData)
    .pipe(
       map((data:any)=> data? data : undefined),
       delay(3000),
       takeUntil(this.destroy$)
    )
   }
}

