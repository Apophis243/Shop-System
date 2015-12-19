import {Component, CORE_DIRECTIVES, OnInit} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, Router, CanActivate} from 'angular2/router';
import {Response} from 'angular2/http';
import toastr from 'toastr/toastr';

import WarenkorbService from '../../service/warenkorb_service';
import Bestellung from '../../model/bestellung';
import Warenkorbposition from '../../model/warenkorbposition';
import IamService from '../../../iam/iam_service';
import Menubar from '../../../../src/app/menubar';

@Component({
    selector: 'warenkorb',
    template: `

		<div class="panel panel-primary" *ng-if="warenkorbpositionen.length > 0">
		<div class="panel-heading">
                <h3 class="panel-title">
                    Alle Artikel
                </h3>
            </div>
			<div class="panel-body">
                <table class="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Nr.</th>
                            <th>ArtikelID</th>
                            <th>Anzahl</th>
                        </tr>
                    </thead>
					<tbody>
                        <!-- Template Binding: ng-for -->
                        <tr *ng-for="var w of warenkorbpositionen; var i = index">
                        <!--
                        <tr *ng-for="#w of warenkorbpositionen; #i = index">
                        -->
                            <td>{{i + 1}}</td>
                            <td>{{w.artikelUri}}</td>
                            <td>{{w.anzahl}}</td>
                        </tr>
                    </tbody>
                </table>

                <a onclick="text1.style.display='block';an.style.display='none';zu.style.display='block'" id="an" align='center' style="display: block" href="#neu">Als JSON Datensaetze anzeigen</a>
                <a onclick="text1.style.display='none';an.style.display='block';zu.style.display='none'" id="zu" align='center' style="display: none" href="#neu">zuklappen</a>
                <a name="neu"></a><DIV id="text1" style="display: none"><pre>{{warenkorbpositionen | json}}</pre></div>

            </div>
            <div class="panel-footer" align='center'>
                <button (click)="bestellen()" class="btn btn-default" type="button">Artikel kaufen</button>
            </div>
        </div>

        <div *ng-if="warenkorbpositionen.length === 0">
            Es sind keine Artikel im Warenkorb
        </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export default class Warenkorb {

    warenkorbpositionen: Array<Warenkorbposition> = this._warenkorbservice.warenkorbpositionen;

    constructor(private _warenkorbservice: WarenkorbService, private _iamservice: IamService,
        private _router: Router, private _menubar : Menubar) {
        console.log('Auszahlungen.constructor()' + this.warenkorbpositionen);
    }

    bestellen() {

        const success: () => void = (): void => {
            toastr.options.closeButton = true;
            toastr.options.closeHtml = '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.success("Artikel gekauft");
            this._menubar.setAnzahlArtikel(this._warenkorbservice.warenkorbpositionen.length);
            this._router.navigate(['Home']);
        };
        const error: (response: Response) => void = (response: Response) => {
            console.log(`response.status: ${response.status}`);
            console.log(`response.text: ${response.text()}`);
            toastr.options.closeButton = true;
            toastr.options.closeHtml = '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.error("Fehler beim Bestellen");
        };
        console.log("Versuch Kaufen");
        this._warenkorbservice.bestellen(this._iamservice.getkundenid(), success, error);
    }

    toString(): String { return 'AlleArtikel'; }
}