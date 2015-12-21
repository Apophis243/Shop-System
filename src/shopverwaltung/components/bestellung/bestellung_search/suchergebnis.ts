import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Response} from 'angular2/http';
import BestellungService from '../../../service/bestellung_service';
import Bestellung from '../../../model/bestellung';
import Bestellposition from '../../../model/bestellposition';

import {log} from '../../../../util/util';


@Component({
    selector: 'suchergebnis',
    template: `
        <div *ng-if="loading">Die Daten werden geladen. Bitte warten ...</div>

        <div class="panel panel-primary" *ng-if="!init && !loading && bestellungen.length > 0">
            <div class="panel-heading">
                <h3 class="panel-title">
                    Gefunden:
                </h3>
            </div>
            <div class="panel-body">
                <table class="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Nr.</th>
                            <th>ID</th>
                            <th>Gesamtbetrag</th>
                            <th>Datum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *ng-for="var b of bestellungen; var i = index">
                        <!--
                        <tr *ng-for="#b of bestellungen; #i = index">
                        -->
                            <td>{{i + 1}}</td>
                            <td>{{b.id}}</td>
                            <td>{{b.gesamtbetrag  | currency: 'EUR': true}}</td>
                            <td>{{b.datumFormatted}}</td>
                             <td>
                                <a [router-link]="['/BestellungDetail', {'id': b.id}]"
                                (click)="bestellung = b" data-toggle="tooltip" title="Details anzeigen">
                                    <i class="fa fa-search"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <a onclick="text1.style.display='block';an.style.display='none';zu.style.display='block'" id="an" align='center' style="display: block" href="#neu">Als JSON Datensaetze anzeigen</a> 
                <a onclick="text1.style.display='none';an.style.display='block';zu.style.display='none'" id="zu" align='center' style="display: none" href="#neu">zuklappen</a> 
                <a name="neu"></a><DIV id="text1" style="display: none"><pre>{{bestellungen | json}}</pre></div>
            </div>
            <div class="panel-footer">
                Falls Fehler bitte neue Suche starten
            </div>
        </div>

        <div *ng-if="!init && !loading && bestellungen.length === 0">
            Es gibt keine passenden Bestellungen
        </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})
export default class GefundeneBestellungen {
    
    
    constructor(private _bestellungservice: BestellungService) {
        console.log('GefundeneBestellungen.constructor()');
        this._bestellungservice.resetallebestellungen;
    }

    get loading(): boolean { return this._bestellungservice.loadingFind; }
    get init(): boolean { return this._bestellungservice.initFind; }
    get bestellungen(): Array<Bestellung> { return this._bestellungservice.allebestellungen;}
    
    

    toString(): String { return 'GefundeneBuecher'; }
}
