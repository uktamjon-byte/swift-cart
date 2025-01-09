import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import {map, timeout, delay, takeUntil} from "rxjs/operators"
import { IReset} from "../interfaces/auth.interface";

@Injectable()
export class ResetService{
   constructor(private http:HttpClient){}
   public accessDenied = new BehaviorSubject<boolean>(false);
   public destroy$ = new Subject<void>();

   getUser(data:IReset){
    console.log('service data', data)
       return this.http.get(`http://localhost:3000/users?email=${data.email}`)
       .pipe(
          map((data:any)=> data? data : undefined),
          delay(3000),
          takeUntil(this.destroy$)
       )
   }

   resetUserPassword(data:IReset){
      console.log('service data', data)
         return this.http.put(`http://localhost:3000/users?email=${data.email}`, data)
         .pipe(
            map((data:any)=> data? data : undefined),
            delay(3000),
            takeUntil(this.destroy$)
         )
     }
}