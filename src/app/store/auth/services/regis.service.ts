import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {map, timeout, delay} from "rxjs/operators"
import { Regis } from "../models/auth.model";

@Injectable()
export class RegisService{
   constructor(private http:HttpClient){}
   public accessDenied = new BehaviorSubject<boolean>(false);
   postUser(userData:Regis){
    return this.http.post('http://localhost:3000/groups',userData)
    .pipe(
       map((data:any)=> data? data : undefined),
       delay(3000)
    )
   }
}