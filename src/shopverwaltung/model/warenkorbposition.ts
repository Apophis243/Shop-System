import {isBlank, isPresent} from '../../util/util';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';

export interface IWarenkorbPosition {
    id?: string;
    version?: number;
    anzahl?: number;
    artikelUri?: string;
	kundeUri?: string;
}


export default class WarenkorbPosition {

    constructor(
        public id: string, public version: number, public anzahl: number,
        public artikelUri: string, public kundeUri: string) {
        this.id = id || null;
        this.version = version || null;
        this.anzahl = anzahl || null;
        this.artikelUri = artikelUri;
		this.kundeUri = kundeUri;
    }

    toString(): string { return JSON.stringify(this, null, 2); }

}
