import {isBlank, isPresent} from '../../util/util';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';

export interface IKundeAdresse {
	plz?: string;
	ort?: string;
	strasse?: string;
	hausnr?: string;
}

export default class KundeAdresse {

	constructor(public plz: string, public ort: string, public strasse: string, public hausnr: string) {
		this.plz = plz;
		this.ort = ort;
		this.strasse = strasse;
		this.hausnr = hausnr;
	}

	toString(): string { return JSON.stringify(this, null, 2); }

}