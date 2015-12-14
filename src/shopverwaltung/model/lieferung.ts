import {isBlank, isPresent} from '../../util/util';
import Bestellposition from './bestellposition';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';


export interface ILieferung {
    id?: string;
    version?: number;
    liefernr?: string;
    transportArt?: string;
    bestellpositionen?: Array<Bestellposition>;
}

export default class Lieferung {

    constructor(
        public id: string, public version: number, public liefernr: string, public transportArt: string,
        public bestellpositionen: Array<Bestellposition>) {
        this.id = id || null;
        this.version = version || null;
        this.liefernr = liefernr || null;
        this.transportArt = transportArt || null;
        this.bestellpositionen = bestellpositionen;
    }

    toString(): string { return JSON.stringify(this, null, 2); }
}
