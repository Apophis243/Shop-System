import {Injectable, Injector} from 'angular2/angular2';

const BENUTZER:string = "admin";
const PASSWORT:string = "p";

@Injectable()
export default class IamService {
    
    private _loginname: string;
    private _password: string;
    private _loginstatus: boolean = false;
    private _adminstatus: boolean = false;
    private _kundenid : string = null;

    constructor() { 
        console.log('IamService.constructor()');
     }

    isLoggedIn(): boolean { 
        return this._loginstatus; 
    }
  
    setLogin(user: string, password: string): boolean {
        if (user == BENUTZER && password == PASSWORT) {
            this._loginstatus = true;
            this._adminstatus = true;
            this._kundenid = "00000001-0000-0000-0000-000000000001";
            return true;
        }
        return false;
    }

    logout(kundenid: string): boolean {
        if (kundenid != null) {
            this._loginstatus = false;
            this._adminstatus = false;
            this._kundenid = null;
            return true;
        }
        return false;
    }
    
    getkundenid() : string {
        return this._kundenid;
    }

    isAdmin(): boolean { return this._adminstatus; }

    toString(): String {
        return `IamService: {loginname: ${this._loginname}, password=${this._password}}`;
    }
}

// fuer den Aufruf innerhalb von @CanActivate
export function isAdmin(): boolean {
    'use strict';
    return Injector.resolveAndCreate([IamService])  // Injector
        .get(IamService)                            // Objekt von IamService
        .isAdmin();
}
