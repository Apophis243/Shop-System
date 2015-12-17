import {isBlank, isPresent} from '../../util/util';
import Adresse from './kunde_adresse';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';

export interface IKundeIdentity {
  loginname?: string;
  enabled?: boolean;
  expirationDate?: string;
  password?: string;
  passwordWdh?: string;
  nachname?: string;
  vorname?: string;
  email?: string;
  adresse?: Adresse;
}

export default class KundeIdentity {

  public expirationDate: Moment;

  constructor(
    public loginname: string, public enabled: boolean, expirationDate: string,  public password: string, public passwordWdh: string, 
    public nachname: string, public vorname: string, public email: string, public adresse: Adresse) {
      
    this.loginname = loginname ;
    this.enabled = enabled;
    this.expirationDate = isPresent(expirationDate) ? moment(expirationDate) : null;
    this.password = password;
    this.passwordWdh = passwordWdh ;
    this.nachname = nachname;
    this.vorname = vorname;
    this.email = email;
    this.adresse = adresse;
  }

  toString(): string { return JSON.stringify(this, null, 2); }
  
  get expirationdateFormatted(): string { return this.expirationDate.format('Do MMM YYYY'); }
  
  get expirationdateFromNow(): string { return this.expirationDate.fromNow(); }

}