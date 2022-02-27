import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proba2',
  templateUrl: './proba2.component.html',
  styleUrls: ['./proba2.component.css']
})
export class Proba2Component{
  brojac: number = 0;
  niz:number[] = [];
  constructor() { }

  pokreniTimer() {
    let intervalId = setInterval(()=>{
      this.brojac++;
      this.niz.push(this.brojac);
      if (this.brojac>=10) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
}
