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
        <div *ng-if="!admin">Um die Warenkorbfunktion zu nutzen, muss man eingeloggt sein !</div>
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
                            <th><span class="sr-only">Spalte f&uuml;r Details</span></th>
                            <th><span class="sr-only">Spalte f&uuml;r Entfernen</span></th>
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
                            <td>
                                <a [router-link]="['/ArtikelDetail', {'id': w.artikelUri}]"
                                   (click)="artikel = w" data-toggle="tooltip"
                                   title="Details anzeigen"><i class="fa fa-search"></i>
                                </a>
                            </td>
                            <td>
                                <a (click)="remove(w.artikelUri)" data-toggle="tooltip"
                                   title="Entfernen"><i class="fa fa-close"></i>
                                </a>
                            </td>
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

        <div *ng-if="warenkorbpositionen.length === 0 && admin">
            Es sind keine Artikel im Warenkorb
        </div>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export default class Warenkorb {

    get warenkorbpositionen() : Array<Warenkorbposition> { return this._warenkorbservice.warenkorbpositionen;}

    constructor(private _warenkorbservice: WarenkorbService, private _iamservice: IamService,
        private _router: Router, private _menubar : Menubar) {
        console.log('Auszahlungen.constructor()' + this.warenkorbpositionen);
    }

    bestellen() {

        const success: () => void = (): void => {
            toastr.options.closeButton = true;
            toastr.options.closeHtml = '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.success("Artikel gekauft. Bestellung bei uns eingegangen.");
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
    
    remove(artikelUri : string) {
        console.log("URI zum loeschen" + artikelUri);
        var result : boolean = this._warenkorbservice.deleteposition(artikelUri);
        if (result == false) {
            toastr.options.closeButton = true;
            toastr.options.closeHtml = '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.error("Fehler beim Loeschen");
        }
        if (result == true) {
            toastr.options.closeButton = true;
            toastr.options.closeHtml = '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.success("Artikel aus Warenkorb entfernt");
            this._menubar.setAnzahlArtikel(this._warenkorbservice.warenkorbpositionen.length);
            this._router.navigate(['Warenkorb']);
        }       
    }
    
    get admin() : boolean { return this._iamservice.isAdmin();}

    toString(): String { return 'AlleArtikel'; }
}