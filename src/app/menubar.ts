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
            </ul>
        </li>
        <li>
            <a >Bestellungen</a>
            <ul>
                <li><a href="#">Suche nach ID</a></li>
                <li><a href="#">Suche nach Kunde</a></li>
                <li><a href="#">Neu anlegen</a></li>
            </ul>
        </li>
        
    </ul>
    `,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})

export default class Menubar {
    constructor(private _iamService: IamService) {
        console.log('Menubar.constructor()');
    }

    isAdmin(): boolean { return this._iamService.isAdmin(); }

    toString(): String { return 'Menubar'; }
}