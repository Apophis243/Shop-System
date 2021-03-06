/*
 * Copyright (C) 2015 Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {Component, CORE_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES, Router, RouteParams} from 'angular2/router';

import IamService from '../iam/iam_service';

@Component({
    selector: 'login',
    template: `
        <div *ng-if="isNotLoggedIn()">
            <a [router-link]="['Login']"><button class="btn btn-default" type="button">Login</button></a>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})
export default class Login {
    constructor(private _iamService: IamService) {
        console.log('Login.constructor()');
    }

    isNotLoggedIn(): boolean { return !this._iamService.isLoggedIn(); }

    toString(): String { return 'Login'; }
}
