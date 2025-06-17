import { Component, OnInit } from '@angular/core';
 import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
   

const myObservable = new Observable(observer => {
  observer.next('Hello');
  observer.next('World');
  observer.complete(); // no more values will be sent
});

myObservable.subscribe({
  next: value => console.log(value),
  complete: () => console.log('Done')
});
  }

}
