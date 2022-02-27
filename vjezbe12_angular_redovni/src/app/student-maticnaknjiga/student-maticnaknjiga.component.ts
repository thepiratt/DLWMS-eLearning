import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MojConfig} from "../moj-config";
import {HttpClient} from "@angular/common/http";

declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-student-maticnaknjiga',
  templateUrl: './student-maticnaknjiga.component.html',
  styleUrls: ['./student-maticnaknjiga.component.css']
})
export class StudentMaticnaknjigaComponent implements OnInit {

  sub: any;
  maticnaKnjigaGetVM: any;
  upisSemestar:any;
  private id: number;

  constructor(private httpKlijent: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.preuzmiPodakt()
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ovjeriLjetni(s:any) {

  }

  upisLjetni(s:any) {

  }

  ovjeriZimski(s:any) {

  }

  upisZimski() {
    this.upisSemestar = {
      studentId:this.maticnaKnjigaGetVM.id,
      obnovaGodine:false,
      cijenaSkolarine:1800,
      datum:new Date(),
      godinaStudija: 1,
      akademskaGodinaId: 1,
    };
  }


  snimiZimskiSemestar() {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/MaticnaKnjiga/AkGodinuZimskiUpis/", this.upisSemestar, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        porukaSuccess("uredu..." + povratnaVrijednost.id);
        this.preuzmiPodakt();
        this.upisSemestar = null;
      });
  }

  private preuzmiPodakt() {
    this.httpKlijent.get(MojConfig.adresa_servera+ `/MaticnaKnjiga/GetByStudent?id=${this.id}`, MojConfig.http_opcije()).subscribe(x=>{
      this.maticnaKnjigaGetVM = x;
    });
}
}
