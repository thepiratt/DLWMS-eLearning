﻿import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutentifikacijaHelper} from "../_helpers/autentifikacija-helper";
import {NastavniciComponent} from "../nastavnici/nastavnici.component";
import {DrzavaComponent} from "../drzava/drzava.component";
import {OpstineComponent} from "../opstine/opstine.component";

@Injectable()
export class AutorizacijaProdekanProvjera implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        try {
          //nedovrseno privremeno rjesenje
          if (AutentifikacijaHelper.getLoginInfo().isPermisijaProdekan)
            return true;
        }catch (e) {
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['home-zaposlenik'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
