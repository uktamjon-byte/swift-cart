import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { SystemService } from 'src/app/store/system/core/services/system.service';

@Component({
  selector: 'app-res-switchlang-canvas',
  templateUrl: './res-switchlang-canvas.component.html',
  styleUrls: ['./res-switchlang-canvas.component.scss']
})
export class ResSwitchlangCanvasComponent implements OnInit {

  constructor(private systemService:SystemService) { }

  ngOnInit(){
    this.systemService.triggerBottomTab.subscribe((val)=>{
      if(val===true){
        console.log('tabvalue', val)
        this.openOffcanvas();
      }
    })
  }

  openOffcanvas(): void {
      const offcanvasElement = document.getElementById('offcanvasBottom');
      if (offcanvasElement) {
        const offcanvasInstance = new bootstrap.Offcanvas(offcanvasElement);
        offcanvasInstance.show();
      }
    }

}
