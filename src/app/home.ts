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

import {Component} from 'angular2/angular2';
import {Response} from 'angular2/http';
import ArtikelService from '../shopverwaltung/service/artikel_service';
import Artikel from '../shopverwaltung/model/artikel';
import {
    isPresent,
    isEmpty
} from '../util/util';

@Component({
    selector: 'home',
    template: `
        <h2>&Uuml;berblick:</h2>

    `
})

export default class Home {

   
    
    constructor(private _artikelservice: ArtikelService) { 
        console.log('Home.constructor()'); 
    }
     
    
    toString(): String { return 'Home'; }
}
