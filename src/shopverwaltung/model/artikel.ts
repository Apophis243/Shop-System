import {isBlank, isPresent} from '../../util/util';

import moment from 'moment/moment';
import {Moment} from 'moment/moment';

const MIN_RATING: number = 0;
const MAX_RATING: number = 5;

export interface IArtikelCommon {
    id?: string;
    bezeichnung: string;
    kategorie: string;
}

export interface IArtikelForm extends IArtikelCommon {
    version?: string;
    preis?: string;
    ausgesondert?: string;
    rating?: string;
}

export interface IArtikelServer extends IArtikelCommon {
    version?: number;
    preis?: number;
    ausgesondert?: boolean;
    rating?: number;
}

export default class Artikel {
    public ratingArray: Array<boolean> = [];
    
    //wird nur von den 2 statischen Methoden fromServer und fromForm aufgerufen
    //nicht direkt, bzw nicht aus anderen Klassen
    constructor(
        public id: string, public bezeichnung: string, public kategorie: string,
        public preis: number, public ausgesondert: boolean, public rating: number, public version: number) {
        this.id = id || null;
        this.bezeichnung = bezeichnung || null;
        this.kategorie = kategorie || null;
        this.preis = preis || null;
        this.ausgesondert = ausgesondert;
        this.version = version;
        for (let i: number = MIN_RATING; i < rating; i++) {
            this.ratingArray.push(true);
        }
        for (let i: number = this.rating; i < MAX_RATING; i++) {
            this.ratingArray.push(false);
        }
    }

    static fromServer(artikel: IArtikelServer): Artikel {
        return new Artikel(artikel.id, artikel.bezeichnung, artikel.kategorie,
            artikel.preis, artikel.ausgesondert, artikel.rating, artikel.version);
    }

    //einzahlung: Workaround für Radiobuttons beim Alegen von einer Buchung
    static fromForm(artikel: IArtikelForm, ausgesondert: boolean): Artikel {
        return new Artikel(artikel.id, artikel.bezeichnung, artikel.kategorie, parseInt(artikel.preis, 10),
            ausgesondert, parseInt(artikel.rating, 10), parseInt(artikel.version, 10));
    }

    containsBeschreibung(bezeichnung: string): boolean {
        return this.bezeichnung.indexOf(bezeichnung) > -1;

    }
    isKategorie(kategorie: string): boolean { return this.kategorie === kategorie; }

    rateUp(): void {
        if (this.rating < MAX_RATING) {
            this.rating++;
        }
    }

    rateDown(): void {
        if (this.rating > MIN_RATING) {
            this.rating--;
        }
    }

    //Version und "Ausgesondert" können nicht verändert werden.
    //Wenn gewünscht, hier mit eintragen und in artikel_edit.ts
    update(
        bezeichnung: string, kategorie: string, preis: number,
        rating: number): void {
        this.bezeichnung = bezeichnung;
        this.kategorie = kategorie;
        this.preis = preis;
        this.rating = rating;
    }

    toString(): string { return JSON.stringify(this, null, 2); }

    toJSON(): IArtikelServer {
        return {
            id: this.id,
            bezeichnung: this.bezeichnung,
            kategorie: this.kategorie,
            preis: this.preis,
            ausgesondert: this.ausgesondert,
            rating: this.rating,
            version: this.version
        };
    }


}