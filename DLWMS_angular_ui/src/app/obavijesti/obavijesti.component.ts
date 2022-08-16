import { Component, OnInit } from '@angular/core';
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";

declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-obavijesti',
  templateUrl: './obavijesti.component.html',
  styleUrls: ['./obavijesti.component.css']
})
export class ObavijestiComponent implements OnInit {
  obavijestiPodaci: any;
  urediObavijest: any;

  constructor(private httpKlijent: HttpClient) {
  }

  ngOnInit(): void {
    this.preuzmiPodakt();
  }

  preuzmiPodakt()
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Obavijest/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.obavijestiPodaci = x;
    });
  }

  obrisi(s:any) {

  }

  detalji(s:any) {
    this.urediObavijest = s;
  }

  btnNovi() {
    this.urediObavijest={
        id: 0
    };
  }

  snimi() {
    //this.odabraniStudent
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Obavijest/Snimi/" + this.urediObavijest.id, this.urediObavijest, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        porukaSuccess("uredu..." + povratnaVrijednost.id);
        this.preuzmiPodakt();
        this.urediObavijest = null;
      });
  }
}
