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
import toastr from 'toastr/toastr';

import IamService from '../iam/iam_service';

@Component({
    selector: 'logout',
    template: `
        <div *ng-if="isLoggedIn()">
            <i class="fa fa-2x fa-sign-out"></i> &nbsp;
            <button (click)="logout()" class="btn btn-default" type="button">Logout</button>
        </div>
    `,
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, NgClass, NgStyle],
    providers: [FormBuilder]
})
export default class Logout {
    constructor(private _iamService: IamService, private _router: Router) {
        console.log('Logout.constructor()');
    }

    isLoggedIn(): boolean { return this._iamService.isLoggedIn(); }

    logout(): void { 
        var status : boolean = this._iamService.logout(this._iamService.getkundenid());
        
        if (status) {
            toastr.options.closeButton = true;
            toastr.options.closeHtml =
            '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.success("Erfolgreich ausgeloggt");
            this._router.navigate(['Home']);
        }
        else if(!status) {
            toastr.options.closeButton = true;
            toastr.options.closeHtml =
            '<button><i class="fa fa-times"></i></button>';
            toastr.options.progressBar = true;
            toastr.error("Fehler beim Logout");
        }
    }

    toString(): String { return 'Logout'; }
}
