import {
Component,
View,
EventEmitter,
NgClass,
NgStyle,
FORM_DIRECTIVES,
CORE_DIRECTIVES,
FormBuilder,
ControlGroup,
Control,
Validators,
OnInit
} from 'angular2/angular2';
import {Response} from 'angular2/http';
import {Router, CanActivate} from 'angular2/router';
import {log} from '../../../../util/util';
import toastr from 'toastr/toastr';

import ArtikelService from '../../../service/artikel_service';
import Artikel from '../../../model/artikel';
import ArtikelValidator from '../../validator/artikel_validator';
import template from './create_artikel.html';



@Component({
    selector: 'create-artikel',
    template: template,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgStyle],
    providers: [FormBuilder]
})

export default class CreateArtikel implements OnInit {

    form: ControlGroup;
    bezeichnung: Control = new Control('', ArtikelValidator.bezeichnung);
    preis: Control = new Control('', Validators.required);
    kategorie: Control = new Control('', Validators.required);
    rating: Control = new Control('', ArtikelValidator.rating);
    status: string = 'false';
    version: number = 0;
    
    //Workaround für Radiobuttons
    ausgesondert: boolean = true;

    constructor(
        private _formBuilder: FormBuilder,
        private _artikelservice: ArtikelService, private _router: Router) {
        console.log('CreateArtikel.constructor()');
    }

    onInit(): void {
        this.form = this._formBuilder.group({
            'bezeichnung': this.bezeichnung,
            'preis': this.preis,
            'kategorie': this.kategorie,
            'rating': this.rating,
            'version': this.version
        });
    }

    @log
    save(): boolean {
        if (!this.form.valid) {
            console.log(
                `valid=${this.bezeichnung.valid}, errorRequired=${this.bezeichnung.errors['required']}`);
            return false;
        }
        
        //Workaround für Radiobuttons
        if (this.status == "true") {
            this.ausgesondert = true;
        }

        const neuerArtikel: Artikel = Artikel.fromForm(this.form.value, this.ausgesondert);
        console.log('Artikel zum speichern= ', neuerArtikel);

        const success: () => void =
            (): void => {
                toastr.options.closeButton = true;
                toastr.options.closeHtml =
                '<button><i class="fa fa-times"></i></button>';
                toastr.options.progressBar = true;
                toastr.success("Buchung wurde angelegt");
                // this._router.navigate(['Home']);
            };
        const error: (response: Response) => void = (response: Response) => {
            console.log(`response.status: ${response.status}`);
            console.log(`response.text: ${response.text() }`);
        };

        this._artikelservice.save(neuerArtikel, success, error);
        return false;
    }

    toString(): String { return 'CreateBuchung'; }

}
