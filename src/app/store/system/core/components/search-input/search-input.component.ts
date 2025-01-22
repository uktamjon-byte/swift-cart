import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SystemService } from 'src/app/store/system/services/system.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  searchInput = document.getElementById('search-inp');
  searchNav = document.getElementById('search-nav');
  private destroy$ = new Subject<void>();
  
  constructor(private systemService:SystemService) { }

  ngOnInit() {
    this.systemService.activeInputResBackdrop
    .pipe(takeUntil(this.destroy$))
    .subscribe((val)=>{
      if(val===true){
        this.onFocus()
      }
    })
  }

 

  onBlur(){
    this.systemService.activeInputBacdrop.next(false);
  }

  onFocus(){
        this.systemService.activeInputBacdrop.next(true)
        this.searchInput?.classList.add('focused');
        console.log('focused', this.systemService.activeInputBacdrop.getValue())
  }

  inActivateResInput(){
    this.systemService.activeInputResBackdrop.next(false);
    this.onBlur()
  }

  ngOnDestroy() {
    // Complete the destroy$ Subject to clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
