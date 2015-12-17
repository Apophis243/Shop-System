import {isBlank, isPresent} from '../../util/util';
import Adresse from './kunde_adresse';
import KundeIdentity from './kunde_identity';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';

export interface IKundePrivat {
  version?: number;
  id?: string;
  identity?: KundeIdentity;
  kategorie?: number;
  rabatt?: number;
  umsatz?: number;
  seit?: string;
  newsletter?: boolean;
  agbAkzeptiert?: boolean;
  bemerkungen?: string;
  bestellungenUri?: string;
  familienstand?: string;
  geschlecht?: string;
  hobbys?: Array<string>;
  signature?: string;
}

export default class KundePrivat {
  
  public seit: Moment;

  constructor(
    public version: number, public id: string, public identity: KundeIdentity, public kategorie: number,  public rabatt: number, public umsatz: number, 
    seit: string, public newsletter: boolean, public agbAkzeptiert: boolean, public bemerkungen: string, public bestellungenUri: string, 
    public familienstand: string, public geschlecht: string, public hobbys: Array<string>, public signature: string) {
    this.version = version ;
    this.id = id;
    this.identity = identity;
    this.kategorie = kategorie;
    this.rabatt = rabatt;
    this.umsatz = umsatz;
    this.seit = isPresent(seit) ? moment(seit) : null;
    this.newsletter = newsletter;
    this.agbAkzeptiert = agbAkzeptiert;
    this.bemerkungen = bemerkungen ;
    this.bestellungenUri = bestellungenUri;
    this.familienstand = familienstand;
    this.geschlecht = geschlecht;
    this.hobbys = hobbys ;
    this.signature = signature;
  }
  
  updateadresse(adresse: Adresse) {
    if (adresse != null) {
      this.identity.adresse = adresse;
    }
  }

  //toString(): string { return JSON.stringify(this, null, 2); }
  
  get seitFormatted(): string { return this.seit.format('Do MMM YYYY'); }
  
  get seitFromNow(): string { return this.seit.fromNow(); }

}