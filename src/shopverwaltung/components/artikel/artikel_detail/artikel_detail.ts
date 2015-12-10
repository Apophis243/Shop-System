import {Component, CORE_DIRECTIVES, OnInit, Input} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Response} from 'angular2/http';
import {isPresent} from '../../../../util/util';

import ArtikelService from '../../../service/artikel_service';
import Artikel from '../../../model/artikel';

@Component({
    selector: 'details-artikel',
    template: `
		<section *ng-if="artikel !== null">
        <h3>Artikel {{artikel.id}}:</h3>
        <table class="table table-stripped table-hover table-responsive">
            <tbody>
                <tr>
                    <td><label>Bezeichnung</label></td>
                    <td>{{artikel.bezeichnung}}</td>
                </tr>
				<tr>
                    <td><label>Kategorie</label></td>
                    <td>{{artikel.kategorie}}</td>
                </tr>
                <tr>
                    <td><label>Preis</label></td>
                    <td>{{artikel.preis}}</td>
                </tr>
                <tr>
                    <td><label>Rating</label></td>
                     <td>
                        <span *ng-for="#r of artikel.ratingArray">
                            <i class="fa fa-star" style="color: yellow;"
                               *ng-if="r === true"></i>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td><label>Ausgesondert</label></td>
                    <td *ng-if="!artikel.ausgesondert">
                        <span> Nicht ausgesondert</span>
                    </td>
                    <td *ng-if="artikel.ausgesondert">
                        <span> Ausgesondert</span>
                    </td>
                </tr>
            </tbody>
        </table>
         <a onclick="text1.style.display='block';an.style.display='none';zu.style.display='block'" id="an" align='center' style="display: block" href="#neu">Als JSON Datensatz anzeigen</a> 
                <a onclick="text1.style.display='none';an.style.display='block';zu.style.display='none'" id="zu" align='center' style="display: none" href="#neu">zuklappen</a> 
                <a name="neu"></a><DIV id="text1" style="display: none"><pre>{{artikel | json}}</pre></div>
                  
        <FORM><INPUT Type="button" value="Back" class="btn btn-primary" align="center" onClick="history.go(-1);return true;"> &nbsp;
         <a [router-link]="['EditArtikel', {'id': artikel.id}]"
               data-toggle="tooltip" title="Bearbeiten">
               <i class="fa fa-2x fa-edit"></i>
         </a>
         </FORM>
		</section>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export default class ArtikelDetail implements OnInit {
    
    constructor(private _artikelservice: ArtikelService, private _routeParams: RouteParams) {
        console.log('DetailsBuch.constructor(): routeParams=', _routeParams);
    }
    
    
    onInit(): void {
        // Pfad-Parameter aus /detailsBuch/:id
        const id: string = this._routeParams.params['id'];
        console.log('BuchungDetail.onInit(): id=', id);
        this._artikelservice.findbyId(id);
    }
    get artikel() : Artikel { return this._artikelservice.artikel; }
    
    toString(): String { return 'BuchungDetail'; }
}