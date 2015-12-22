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
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';
import iAmService from '../../../../iam/iam_service';

@Component({
    selector: 'create-artikel',
    template: `
        <div *ng-if="!admin">
		<div class="panel-heading" align="center">
            <h3 class="panel-title">Wer sind Sie ?</h3>
        </div>
        <div class="panel-body">
            <TABLE BORDER=0 align="center" width="50%"> 
                <TR> 
                    <TD COLSPAN=3 ALIGN="CENTER">Sind Sie Privatkunde oder Firmenkunde ?</TD> 
                </TR> <br>
                <TR> 
                    <TH align="center" width="50%"><a [router-link]="['KundeRegisterPrivat']"><button class="btn btn-default">Privatkunde</button></a></TH>
                    <TH align="center" width="50%"><a [router-link]="['Home']"><button class="btn btn-default">Firmenkunde</button></a></TH> 
                </TR> 
        </TABLE>
        
        </div>
        <div class="panel-footer" align='center'>
            Wenn Sie bereits einen Account haben, bitte einfach einloggen
        </div>
        </div>
        <div *ng-if="admin">Sie sind bereits eingeloggt. !</div>
    `,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
    providers: [FormBuilder]
})

export default class KundeRegisterLandingPage {

    constructor(private _router: Router, private _iamservice : iAmService) {
        console.log('KundeRegisterLandingPage.constructor()');
    }

    toString(): String { return 'CreateBuchung'; }
    
    get admin() : boolean { return this._iamservice.isAdmin();}

}
