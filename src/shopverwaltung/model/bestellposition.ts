import {isBlank, isPresent} from '../../util/util';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';

export interface IBestellposition {
    id?: string;
    version?: number;
    anzahl?: number;
    artikelUri?: string;
}


export default class Bestellposition {

    constructor(
        public id: string, public version: number, public anzahl: number, 
        public artikelUri: string) {
        this.id = id || null;
        this.version = version || null;
        this.anzahl = anzahl || null;
        this.artikelUri = artikelUri;
    }

    toString(): string { return JSON.stringify(this, null, 2); }

}
