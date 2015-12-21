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

import {Component, CORE_DIRECTIVES, OnInit, FORM_DIRECTIVES, FormBuilder, 
            Input, ControlGroup, Control, Validators,} from 'angular2/angular2';
import {Router, RouteParams, CanActivate} from 'angular2/router';
import {Response} from 'angular2/http';
import {isPresent, isBlank, log} from '../../../../util/util';

import ArtikelService from '../../../service/artikel_service';
import Artikel from '../../../model/artikel';
import ArtikelValidator from '../../validator/artikel_validator';


@Component({
    selector: 'edit-artikel',
    template: `
        <section *ng-if="artikel !== null">
            <h3>Artikel {{artikel.id}} editieren:</h3>
           <form [ng-form-model]="form" (submit)="update()" class="form-horizontal" role="form">
           
            <div class="form-group" [class.has-error]="!bezeichnung.valid && bezeichnung.touched">
        <label for="bezeichnungInput" class="col-sm-2 control-label">Bezeichnung *</label>
        <div class="col-sm-10">
            <input id="bezeichnungInput"
                placeholder="Bezeichnung"
                class="form-control"
                autofocus
                type="search"
                [ng-form-control]="bezeichnung"/>
        </div>
        <div class="col-sm-offset-2 col-sm-10" *ng-if="!bezeichnung.valid && bezeichnung.touched">
            <span class="help-block">
                Die Bezeichnung muss mit einem Buchstaben oder Zahl beginnen!
            </span>
        </div>
    </div>
    
    <div class="form-group" [class.has-error]="!preis.valid && preis.touched">
        <label for="preisInput" class="col-sm-2 control-label">Preis *</label>
        <div class="col-sm-10">
            <input id="preisInput"
                placeholder="Preis, z.B. 123.45"
                class="form-control"
                autofocus
                type="search"
                [ng-form-control]="preis"/>
        </div>
        <div class="col-sm-offset-2 col-sm-10" *ng-if="!preis.valid && preis.touched">
            <span class="help-block">
                Ein Preis muss eingegeben werden, z.B. 123.45
            </span>
        </div>
    </div>

    <div class="form-group" [class.has-error]="!kategorie.valid && kategorie.touched">
        <label class="col-sm-2 control-label">Kategorie</label>
        <div class="col-sm-10">
            <select class="form-control" [ng-form-control]="kategorie">
                <option value="">Bitte Kategorie ausw&auml;hlen</option>
                <option value="BAD">Bad</option>
                <option value="BUERO">Buero</option>
                <option value="DIELE">Diele</option>
                <option value="ESSZIMMER">Esszimmer</option>
                <option value="KINDERZIMMER">Kinderzimmer</option>
                <option value="KUECHE">Kueche</option>
                <option value="SCHLAFZIMMER">Schlafzimmer</option>
                <option value="WOHNZIMMER">Wohnzimmer</option>
           </select>
        </div>
        <div class="col-sm-offset-2 col-sm-10" *ng-if="!kategorie.valid && kategorie.touched">
            <span class="help-block">
                Kategorie bitte angeben
            </span>
        </div>
    </div>
    
    <div class="form-group" [class.has-error]="!rating.valid && rating.touched">
        <label for="ratingInput" class="col-sm-2 control-label">Rating</label>
        <div class="col-sm-10">
            <input id="ratingInput"
                placeholder="Zahlen von 0-5"
                class="form-control"
                autofocus
                type="search"
                [ng-form-control]="rating"/>
        </div>
        <div class="col-sm-offset-2 col-sm-10" *ng-if="!rating.valid && rating.touched">
            <span class="help-block">
                Das Rating muss zwischen 0 und 5 liegen
            </span>
        </div>
    </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button class="btn btn-default"
                            [disabled]="form.pristine || !form.valid">
                        <i class="fa fa-check"></i> &nbsp; Aenderungen speichern
                    </button>
                </div>
            </div>
            
        </form>
        </section>

        <div class="has-error" *ng-if="artikel === null">
            <span class="help-block"><h4>Kein Artikel zu dieser ID gefunden</h4></span>
        </div>
    `,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    providers: [FormBuilder]
})

export default class EditArtikel implements OnInit {
    
    form: ControlGroup;
    bezeichnung: Control;
    preis: Control;
    kategorie: Control;
    rating: Control;
    
    constructor(private _formBuilder: FormBuilder, private _artikelservice: ArtikelService, 
                private _routeParams: RouteParams, private _router: Router) {
        console.log('UpdateBuchung.constructor(): routeParams=', _routeParams);
    }

    onInit(): void {
        const id: string = this._routeParams.params['id'];
        console.log('UpdateBuch.onInit(): id=', id);

        const errorHTTP: (response: Response) => void =
            (response: Response) => {
                if (isPresent(id)) {
                    console.error(`Kein Buch zur ID ${id} vorhanden`);
                }
            };
        this._artikelservice.findbyId(id);
        
        // Definition und Vorbelegung der Eingabedaten
        this.bezeichnung = new Control(this.artikel.bezeichnung, ArtikelValidator.bezeichnung);
        this.preis = new Control(this.artikel.preis, Validators.required);
        this.kategorie = new Control(this.artikel.kategorie, Validators.required);
        this.rating = new Control(this.artikel.rating, ArtikelValidator.rating);

        this.form = this._formBuilder.group({
            'bezeichnung': this.bezeichnung,
            'preis': this.preis,
            'kategorie': this.kategorie,
            'rating': this.rating,
        });
    }

    get artikel() : Artikel { return this._artikelservice.artikel; }
    
    //@log
    update(): boolean {
        
        if (this.form.pristine) {
            console.log('Buchung.update(): pristine');
            return;
        }
        if (isBlank(this.artikel)) {
            console.error('Artikel.update(): artikel === null/undefined');
            return;
        }

        // Version und "Ausgesondert" können nicht geändert werden
        //Falls gewünscht, hier und im Model unter update mit eintragen
        this.artikel.update(this.bezeichnung.value, this.kategorie.value, this.preis.value, this.rating.value);
        console.log('So soll neuer Artikel aussehen: ', this.artikel);

        const success: () => void =
            (): void => {
                // this._router.navigate(['/Home']); 
                };
        this._artikelservice.update(this.artikel, success, null);

        // damit das (Submit-) Ereignis konsumiert wird und nicht an
        // uebergeordnete Eltern-Komponenten propagiert wird bis zum
        // Refresh der gesamten Seite
        return false;
    }

    toString(): String { return 'UpdateBuchung'; }
}
