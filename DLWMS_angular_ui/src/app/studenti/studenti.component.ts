import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MojConfig} from "../moj-config";
import {Router} from "@angular/router";
declare function porukaSuccess(a: string):any;
declare function porukaError(a: string):any;

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {

  title:string = 'angularFIT2';
  ime:string = '';
  studentPodaci: any;
  odabraniStudent: any=null;

  constructor(private httpKlijent: HttpClient, private router: Router) {
  }

  testirajWebApi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Student/GetAll", MojConfig.http_opcije()).subscribe(x=>{
      this.studentPodaci = x;
    });
  }

  getStudentPodaci() {
    if (this.studentPodaci == null)
      return [];
    return this.studentPodaci.filter((x: any)=> x.ime.length==0 || (x.ime + " " + x.prezime).toLowerCase().startsWith(this.ime.toLowerCase()) || (x.prezime + " " + x.ime).toLowerCase().startsWith(this.ime.toLowerCase()));
  }

  ngOnInit(): void {
    this.testirajWebApi();
  }

  detalji(s:any) {
      this.odabraniStudent= s;
      this.odabraniStudent.prikazi = true;
  }

  snimi() {
    //this.odabraniStudent
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Student/Update/" + this.odabraniStudent.id, this.odabraniStudent, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        porukaSuccess("uredu..." + povratnaVrijednost.opstina_rodjenja.drzava.naziv);
    });
  }

  btnNovi() {
    this.odabraniStudent = {
      prikazi:true,
      id:0,
      ime :"",
      prezime:"",
      broj_indeksa: "ib0000",
      opstina_rodjenja_id:  1,
      datum_rodjenja: "2003-10-01"
    }
  }

  obrisi(s:any) {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Student/Delete/" + s.id,null, MojConfig.http_opcije())
      .subscribe((povratnaVrijednost:any) =>{
        const index = this.studentPodaci.indexOf(s);
        if (index > -1) {
          this.studentPodaci.splice(index, 1);
        }
        porukaSuccess("obrisano..." + povratnaVrijednost.ime);
      });
  }

  maticnaknjiga(s:any) {
    this.router.navigate(['/student-maticnaknjiga', s.id]);
  }
}
