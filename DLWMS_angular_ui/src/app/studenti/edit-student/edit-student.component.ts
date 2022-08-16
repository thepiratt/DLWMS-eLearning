import {Component, Input, OnInit} from '@angular/core';
import {MojConfig} from "../../moj-config";
import {HttpClient} from "@angular/common/http";

declare function porukaSuccess(s:string):any;

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  @Input()
  urediStudent: any;

  constructor(private httpKlijent: HttpClient) {
  }
  ngOnInit(): void {
  }

  snimi() {
    this.httpKlijent.post(MojConfig.adresa_servera+ "/Student/Update/" + this.urediStudent.id, this.urediStudent, MojConfig.http_opcije()).subscribe((povratnaVrijednost:any) =>{
      porukaSuccess("uredu..." + povratnaVrijednost.opstina_rodjenja.drzava.naziv);
      this.urediStudent.prikazi = false;
    });
  }


}
