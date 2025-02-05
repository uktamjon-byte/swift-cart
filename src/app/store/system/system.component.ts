import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { SystemService } from './core/services/system.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit{
  isResInputActive: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private systemService:SystemService) { 
  }

  inpActiveBacdrop:boolean = false;

  ngOnInit() {
    this.systemService.activeInputBacdrop
    .pipe(takeUntil(this.destroy$))
    .subscribe(val=>{
      this.inpActiveBacdrop = val;
      console.log('sdssdsd', this.inpActiveBacdrop)
    })

    this.systemService.activeInputResBackdrop
    .pipe(takeUntil(this.destroy$))
    .subscribe((val) => {
      console.log('obs value', val)
      this.isResInputActive = val;
    });
   
  }

  scrollToTop(){
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  }

  ngOnDestroy(): void {
    // Complete the destroy$ Subject to clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

}
