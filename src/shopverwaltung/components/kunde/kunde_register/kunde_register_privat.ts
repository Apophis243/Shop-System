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

import KundenService from '../../../service/kunde_service';
import KundePrivat from '../../../model/kunde_privat';
import KundeIdentity from '../../../model/kunde_identity';
import KundeAdresse from '../../../model/kunde_adresse';
import template from './kunde_register_privat.html';



@Component({
    selector: 'create-kundeprivat',
    template: template,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgStyle],
    providers: [FormBuilder]
})

export default class CreateKundePrivat implements OnInit {

    form: ControlGroup;
    loginname: Control = new Control('', Validators.required);
    nachname: Control = new Control('', Validators.required);
    vorname: Control = new Control('', Validators.required);
    email: Control = new Control('', Validators.required);
    password: Control = new Control('', Validators.required);
    passwordWdh: Control = new Control('', Validators.required);
    //Radiobuttons
    geschlecht: string = "MAENNLICH";
    
    familienstand: Control = new Control('', Validators.required);
    strasse: Control = new Control('', Validators.required);
    hausnr: Control = new Control('', Validators.required);
    ort: Control = new Control('', Validators.required);
    plz: Control = new Control('', Validators.required);
    sport: Control = new Control(false);
    lesen: Control = new Control(false);
    reisen: Control = new Control(false);
    signature: Control = new Control('', Validators.required);
    newsletter: Control = new Control(false);
    agbAkzeptiert: Control = new Control(false);

    //Für von REST-Schnittstelle verlangten Attribute, die nicht im HTML Dokument 
    //integriert sind. Kunde muss diese also bei Registrierung nicht eingeben
    version: number = 0;
    id: string = "";
    kategorie: number = 1;
    rabatt: number = 0;
    umsatz: number = 0;
    seit: string = "2015-10-10";
    bemerkungen: string = "";
    bestellungenUri: string = "";
    enabled : boolean = true;
    expirationDate: string = "2100-10-10";
    //Für Hobbys. Sind im HTML als Checkbox und werden später in das Array geschrieben
    hobbys: Array<string> = [];
    //Workaround für Radiobuttons
    geschlechtfinal : string = "MAENNLICH";
    
    //Zum umwandeln der Werte der Comboboxen, da diese als Boolean sein müssen
    agb: boolean = false;
    newslett: boolean = false;
    


    constructor(
        private _formBuilder: FormBuilder,
        private _kundenservice: KundenService, private _router: Router) {
        console.log('KundePrivatRegister.constructor()');
    }

    onInit(): void {
        this.form = this._formBuilder.group({
            'loginname': this.loginname,
            'nachname': this.nachname,
            'vorname': this.vorname,
            'email': this.email,
            'password': this.password,            
            'passwordWdh': this.passwordWdh,
            'familienstand': this.familienstand,
            'strasse': this.strasse,
            'hausnr': this.hausnr,
            'ort': this.ort,
            'plz': this.plz,
            'sport': this.sport,
            'lesen': this.lesen,
            'reisen': this.reisen,
            'signature': this.signature,            
            'newsletter': this.newsletter,
            'agbAkzeptiert': this.agbAkzeptiert
        });
    }

   
    save(): boolean {
        if (!this.form.valid) {
            console.log(
                `valid=${this.loginname.valid}, errorRequired=${this.loginname.errors['required']}`);
            return false;
        }
        
        //Workaround für Radiobuttons
        if (this.form.value.geschlecht == "WEIBLICH") {
            this.geschlechtfinal = "WEIBLICH";
        }
        
        //Befüllen des Hobby Arrays. Werte aus Comboboxen
        if (this.form.value.sport != null) {
            this.hobbys.push(this.sport);
        }
        if (this.form.value.lesen != null) {
            this.hobbys.push(this.lesen);
        }
        if (this.form.value.reisen != null) {
            this.hobbys.push(this.reisen);
        }
        console.log("Hobbies:" + this.hobbys.length);
        
        //Auswerten/Konvertieren von AGB und Newsletter
        
        if (this.form.value.agbAkzeptiert != null) {
            this.agb = true;
        }
        if (this.form.value.newsletter != null) {
            this.newslett = true;
        }
        
        const adressetemp: KundeAdresse = new KundeAdresse(this.form.value.plz, this.form.value.ort, this.form.value.strasse, this.form.value.hausnr);
        const identitytemp: KundeIdentity = new KundeIdentity(this.form.value.loginname, this.enabled, this.expirationDate, this.form.value.password, this.form.value.passwordWdh, this.form.value.nachname, this.form.value.vorname, this.form.value.email, adressetemp);    
        const kundetemp: KundePrivat = new KundePrivat(this.version, this.id, identitytemp, this.kategorie, this.rabatt, this.umsatz, this.seit, this.newslett, this.agb, this.bemerkungen, this.bestellungenUri, this.form.value.familienstand, this.geschlechtfinal, this.hobbys, this.form.value.signature);
        
        //Logging zum testen ob Attribute richtig gesetzt sind
        console.log("TEST PLZ: " + this.form.value.plz);
        console.log("TEST ADRESSE " + adressetemp);
        console.log("TEST IDENTITY " + identitytemp);
        console.log("TEST KUNDEPRIVAT " + kundetemp.agbAkzeptiert + kundetemp.identity.adresse.plz);

        const success: () => void =
            (): void => {
                toastr.options.closeButton = true;
                toastr.options.closeHtml =
                '<button><i class="fa fa-times"></i></button>';
                toastr.options.progressBar = true;
                toastr.success("KundePrivat wurde angelegt");
                // this._router.navigate(['Home']);
            };
        const error: (response: Response) => void = (response: Response) => {
            console.log(`response.status: ${response.status}`);
            console.log(`response.text: ${response.text() }`);
        };

        this._kundenservice.saveprivatkunde(kundetemp, success, error);
        
        return false;
    }

    toString(): String { return 'CreateKundePrivat'; }

}
