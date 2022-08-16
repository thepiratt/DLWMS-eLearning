import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proba1',
  templateUrl: './proba1.component.html',
  styleUrls: ['./proba1.component.css']
})
export class Proba1Component  {

  title:string = 'angularFIT2';
  ime:string = '';
  brojac: number=0;
  niz:string[]=['jedan', 'dva', 'tri', 'četiri'];

  testirajString() :void
  {
    this.brojac++;
    this.ime += "." + this.brojac;
  }

  pokreniTimer() :void
  {
    setInterval(()=>{
      this.brojac++;
    }, 1000);
  }

  jelVidljivo() :boolean {
    return this.ime.length>0
  }

  mojStyle() {
    return (this.brojac%2==0)?{'color':'blue', 'margin-left': (this.brojac + 'px')}: {'color': 'red', 'margin-left': (this.brojac + 'px')}
  }
}
