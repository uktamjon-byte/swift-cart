import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/store/system/services/system.service';

@Component({
  selector: 'app-search-input-res',
  templateUrl: './search-input-res.component.html',
  styleUrls: ['./search-input-res.component.scss']
})
export class SearchInputResComponent implements OnInit {
  isResInputActive: boolean = false;

  constructor(private systemService: SystemService) { }

  ngOnInit(): void {
  }
}
