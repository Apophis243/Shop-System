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
import {ROUTER_DIRECTIVES, Router, CanActivate} from 'angular2/router';
import {Response} from 'angular2/http';
import toastr from 'toastr/toastr';

import IamService from '../../../iam/iam_service';


@Component({
    selector: 'login',
    template: `

		<div *ng-if="!isLoggedIn()">
		<div class="panel-heading">
                <h3 class="panel-title">
                    Login
                </h3>
        </div>

        <form [ng-form-model]="form" (submit)="login()" class="form-horizontal" role="form">
            <label for="usernameInput" class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
                <input id="usernameInput"
                    placeholder="Username"
                    class="form-control"
                    autofocus
                    type="search"
                    [ng-form-control]="username"/>
            </div>
            <div height="3px" widht="100%">&nbsp;</div>
            <label for="passwordInput" class="col-sm-2 control-label">Passwort</label>
            <div class="col-sm-10">
                <input id="passwordInput"
                    class="form-control"
                    autofocus
                    type="password"
                    [ng-form-control]="password"/>
            </div>
            <div height="5px" widht="100%">&nbsp;</div>
            <div class="form-group" align="right">
            <div class="col-sm-offset-2 col-sm-10">
                <button class="btn btn-default">Login</button>
            </div>
        </div>
    </form>
    `,
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES]
})

export default class LoginService implements OnInit{
    
    form: ControlGroup;
    username: Control = new Control('');
    password: Control = new Control('');
    
    private _username: string = null;
    private _password: string = null;
    
    constructor(private _formBuilder: FormBuilder, private _iamService: IamService,
    private _router: Router) {
        console.log('Login.constructor()');
    }
    
    onInit(): void {
        this.form = this._formBuilder.group({
            'username': this.username,
            'password': this.password
        });
    }
    
    login() {
        
        var status : boolean = this._iamService.setLogin(this.form.value.username, this.form.value.password);
        
        if (status) {
            this._router.navigate(['Home']);
        }
        else if(!status) {
            toastr.options.closeButton = true;
            toastr.options.closeHtml =
            '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.error("Fehler beim Login");
        }
    }



    isLoggedIn(): boolean { return this._iamService.isLoggedIn(); }

    toString(): String { return 'AlleArtikel'; }
}