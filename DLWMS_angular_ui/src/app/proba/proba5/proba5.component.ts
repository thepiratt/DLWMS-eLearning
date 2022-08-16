import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proba5',
  templateUrl: './proba5.component.html',
  styleUrls: ['./proba5.component.css']
})
export class Proba5Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  info() {
    alert('Ovo je alert iz funkcije info');
  }
}
