import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../../moj-config";

@Component({
  selector: 'app-proba4',
  templateUrl: './proba4.component.html',
  styleUrls: ['./proba4.component.css']
})
export class Proba4Component{
  studentPodaci: any;

  constructor(private httpKlijent: HttpClient) {
  }

  testirajWebApi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera
      + "/Student/GetAll")
      .subscribe(x=>{
      this.studentPodaci = x;
    });
  }
}
