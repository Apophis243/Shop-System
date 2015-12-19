import {Component, CORE_DIRECTIVES, OnInit, Input} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {Response} from 'angular2/http';
import {isPresent} from '../../../../util/util';

import BestellungService from '../../../service/bestellung_service';
import Bestellung from '../../../model/bestellung';

@Component({
	selector: 'details-bestellung',
	template: `
		<section *ng-if="bestellung !== null">
        <h3>Bestellung {{bestellung.id}}:</h3>
		<table class="table table-stripped table-hover table-responsive">
            <tbody>
                <tr>
                    <td><label>ID</label></td>
                    <td>{{bestellung.id}}</td>
                </tr>
				<tr>
                    <td><label>Betrag</label></td>
                    <td>{{bestellung.gesamtbetrag}}</td>
                </tr>
                <tr>
                    <td><label>Version</label></td>
                    <td>{{bestellung.version}}</td>
                </tr>
             </tbody>
	    </table>
         <a onclick="text1.style.display='block';an.style.display='none';zu.style.display='block'" id="an" align='center' style="display: block" href="#neu">Als JSON Datensatz anzeigen</a> 
                <a onclick="text1.style.display='none';an.style.display='block';zu.style.display='none'" id="zu" align='center' style="display: none" href="#neu">zuklappen</a> 
                <a name="neu"></a><DIV id="text1" style="display: none"><pre>{{bestellung | json}}</pre></div>
                  
        <FORM><INPUT Type="button" value="Back" class="btn btn-primary" align="center" onClick="history.go(-1);return true;"> &nbsp;
        </FORM>
		</section>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export default class BestellungDetail implements OnInit {
    constructor(private _bestellungservice: BestellungService, private _routeParams: RouteParams) {
        console.log('DetailsBuch.constructor(): routeParams=', _routeParams);
    }
    onInit(): void {
        // Pfad-Parameter aus /detailsBuch/:id
        const id: string = this._routeParams.params['id'];
        console.log('BestellungDetail.onInit(): id=', id);
        this._bestellungservice.findbyDetailId(id);
    }
    get bestellung() : Bestellung { return this._bestellungservice.bestellung; }
    
    toString(): String { return 'BestellungDetail'; }
}