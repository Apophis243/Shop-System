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
import {Component, CORE_DIRECTIVES, OnInit} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Response} from 'angular2/http';
import ArtikelService from '../shopverwaltung/service/artikel_service';
import Artikel from '../shopverwaltung/model/artikel';
import {random} from '../util/mock';

@Component({
    selector: 'home',
    template: `
    <section *ng-if="artikel !== null">
        <div align ="center"><h3>Willkommen in unserem Shop. Hier finden Sie alles was Sie brauchen !</h3></div>
        <br><br>
        <table align="center" width="90%">
        <caption><b>Das ist unser Artikel des Tages nochmals deutlich reduziert</b></caption>
        <div height="15px"></div>
        <tbody>
        <tr>
            <td><img src="https://localhost:9443/src/img/{{artikel.id}}.jpg" alt="Beispielbild" /></td> 
            <td>
                Bezeichnung: {{artikel.bezeichnung}}<br><br>
                Aktionspreis: &nbsp;Anstatt <s>{{artikel.preis + 50 | currency: 'EUR': true}}</s> jetzt nur &nbsp; {{artikel.preis | currency: 'EUR': true}}<br><br>
                Bewertung: <span *ng-for="#r of artikel.ratingArray">
                            <i class="fa fa-star" style="color: yellow;" *ng-if="r === true"></i>
                            </span><br><br>
                Kategorie: {{artikel.kategorie}}
            </td>
        </tr>
        </tbody>
        </table>
	</section>
    `
})

export default class Home implements OnInit {
    
    constructor(private _artikelservice: ArtikelService) { 
        console.log('Home.constructor()'); 
    }
    onInit(): void {
        this._artikelservice.findbyId(random());
    }
    
    get artikel() : Artikel { return this._artikelservice.artikel; }

    toString(): String { return 'Home'; }
}
