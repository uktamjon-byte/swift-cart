import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {map, timeout, delay} from "rxjs/operators"
import { Reset } from "../models/auth.model";

@Injectable()
export class ResetService{
   constructor(private http:HttpClient){}
   public accessDenied = new BehaviorSubject<boolean>(false);
   getUser(data:Reset){
    console.log('service data', data)
       return this.http.get(`http://localhost:3000/users?email=${data.email}`)
       .pipe(
          map((data:any)=> data? data : undefined),
          delay(3000)
       )
   }

   resetUserPassword(data:Reset){
      console.log('service data', data)
         return this.http.put(`http://localhost:3000/users?email=${data.email}`, data)
         .pipe(
            map((data:any)=> data? data : undefined),
            delay(3000)
         )
     }
}