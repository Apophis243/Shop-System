import {
    Component,
    FORM_DIRECTIVES,
    CORE_DIRECTIVES,
    FormBuilder,
    ControlGroup,
    Control,
    OnInit
} from 'angular2/angular2';
import {Response} from 'angular2/http';

import BestellungService from '../../../service/bestellung_service';
import Bestellung from '../../../model/bestellung';

import {log, isEmpty} from '../../../../util/util';

@Component({
    selector: 'such-kriterien',
    template: `
        <p></p>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">Bestellungen anhand von ID oder nach KundenId suchen:</h3>
            </div>
            <div class="panel-body">
                <form [ng-form-model]="form" (submit)="find()" class="form-horizontal" role="form">
                
                
                    <div class="form-group">
                        <label for="bestellungidInput" class="col-sm-2 control-label">BestellungID:</label>
                        <div class="col-sm-10">
                            <input id="bestellungidInput"
                                type="search"
                                placeholder="ID eingeben"
                                class="form-control"
                                [ng-form-control]="bestellungid"/>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="kundeidInput" class="col-sm-2 control-label">Nach KundenID:</label>
                        <div class="col-sm-10">
                            <input id="kundeidInput"
                                type="search"
                                placeholder="KundenID eingeben"
                                class="form-control"
                                [ng-form-control]="kundeid"/>
                        </div>
                    </div>
                  
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <div class="help-block">Hinweis: Suche nur nach exakten IDs</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-10">
                            <button class="btn btn-default"><i class="fa fa-search"></i> &nbsp; Suchen</button>
                        </div>
                    </div>

                    <div class="form-group" [class.has-error]="errorMsg !== null">
                        <div class="col-sm-offset-2 col-sm-10">
                            <div class="help-block">
                                {{errorMsg}}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FormBuilder]
})
export default class SuchKriterien implements OnInit {
    
    form: ControlGroup;
    bestellungid: Control = new Control('');
    kundeid: Control = new Control('');

    errorMsg: string = null;

    constructor(private _formBuilder: FormBuilder, private _bestellungservice: BestellungService) {
        console.log('SuchKriterien.constructor()');
    }

    onInit(): void {
        this.form = this._formBuilder.group({
            'bestellungid': this.bestellungid,
            'kundeid': this.kundeid
        });
    }

  
    find(): boolean {
        console.log('form.value=', this.form.value);
        console.log('BestellungID', this.form.value.bestellungid);
        console.log('KundeID', this.form.value.kundeid);

        // Resultat der Suche zuruecksetzen
        this._bestellungservice.allebestellungen = [];
        this.errorMsg = null;

        // fuer den asynchronen Callback onNext() auf dem Observable vom GET-Request
        const error: (response: Response) => void = (response: Response) => {
            console.log(`response.status: ${response.status}`);
            console.log(`response.body: ${response.text()}`);
            this.errorMsg = 'Keine Bücher gefunden';
        };
        
       if (this.form.value.bestellungid == null && this.form.value.kundeid == null) {
           this.errorMsg = "Bitte eine ID eingeben";
       }
       if (!isEmpty(this.form.value.bestellungid)  && !isEmpty(this.form.value.kundeid)) {
           this.errorMsg = "Bitte nur eine ID eingeben";
       }
       if (!isEmpty(this.form.value.bestellungid)) {
           this._bestellungservice.findbyId(this.form.value.bestellungid);
       }
       else if (!isEmpty(this.form.value.kundeid)) {
           this._bestellungservice.findbyKundeId(this.form.value.kundeid);
       }
       else {
           this.errorMsg = "Die Eingabe konnte nicht verarbeitet werden";
       }
       
        return false;
    }

    toString(): String { return 'SuchKriterien'; }
}
