import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  public showPaginationSubject = new BehaviorSubject<boolean>(false);

  constructor() { }


}
