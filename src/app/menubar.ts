/*
 * Copyright (C) 2015 Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import IamService from '../iam/iam_service';
import WarenkorbService from '../shopverwaltung/service/warenkorb_service';

@Component({
    selector: 'menubar',
    template: `
    <ul id="menu">
        <li><a [router-link]="['Home']">Home</a></li>
        <li>
            <a >Artikel</a>
            <ul>
                <li><a [router-link]="['AlleArtikel']">Alle Artikel</a></li>
                <li><a [router-link]="['CreateArtikel']">Artikel anlegen</a></li>
                <li><a [router-link]="['Balkendiagramm']">Balkendiagramm</a></li>
                <li><a [router-link]="['Liniendiagramm']">Liniendiagramm</a></li>
                <li><a [router-link]="['Tortendiagramm']">Tortendiagramm</a></li>
            </ul>
        </li>
        <li>
            <a >Bestellungen</a>
            <ul>
                <li><a [router-link]="['SearchBestellungen']">Suche</a></li>
            </ul>
        </li>
        <li>
            <a >Kunden</a>
            <ul>
                <li><a [router-link]="['KundeRegisterLandingPage']">Register</a></li>
            </ul>
        </li>
        <li>
            <a id="AnzahlArtikel" [router-link]="['Warenkorb']">Warenkorb ({{artikelimwarenkorb}})</a>
        </li>
    </ul>
    `,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})

export default class Menubar {
    constructor(private _iamService: IamService, private _warenkorbservice: WarenkorbService) {
        console.log('Menubar.constructor()');
    }
    
    artikelimwarenkorb : number = this._warenkorbservice.warenkorbpositionen.length;
    
    public setAnzahlArtikel(anzahl : number) : void {
        this.artikelimwarenkorb = anzahl;
        document.getElementById("AnzahlArtikel").innerHTML = "Warenkorb (" + this.artikelimwarenkorb + ")";
    }

    isAdmin(): boolean { return this._iamService.isAdmin(); }

    toString(): String { return 'Menubar'; }
}