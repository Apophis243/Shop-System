import {isBlank, isPresent} from '../../util/util';
import Bestellposition from './bestellposition';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';

export interface IBestellung {
  id?: string;
  version?: number;
  gesamtbetrag?: number;
  kundeUri?: string;
  datum?: string;
  bestellpositionen?: Array<Bestellposition>;
}

export default class Bestellung {

  public datum: Moment;

  constructor(
    public id: string, public version: number, public gesamtbetrag: number, public kundeUri: string,
    datum: string, public bestellpositionen: Array<Bestellposition>) {
    this.id = id ;
    this.version = version;
    this.gesamtbetrag = gesamtbetrag;
    this.kundeUri = kundeUri;
    this.datum = isPresent(datum) ? moment(datum) : null;
    this.bestellpositionen = bestellpositionen;
  }

  toString(): string { return JSON.stringify(this, null, 2); }

  addPosition(bestellposition: Bestellposition) {
    if (bestellposition != null) {
      this.bestellpositionen.push(bestellposition);
    }
  }

}