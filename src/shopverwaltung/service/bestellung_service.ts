import {Inject, provide, Provider} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {ChartDataSet, LinearChartData, CircularChartData, IChart} from 'chart/Chart';

import Bestellung from '../model/bestellung';
import {IBestellung} from '../model/bestellung';
import {ChartService, SCHEME, SERVERNAME, PORT, BASE_PATH_BUECHER, isPresent, log, isEmpty, isBlank } from '../../util/util';


export default class BestellungService {
	
    private _baseUriBuecher: string;
    private username: string = 'admin';
    private password: string = 'p';
    private basicAuth: string = 'Basic ' + window.btoa(`${this.username}:${this.password}`);
    private bestellungheader = new Headers();
    private bestellunguri: string = 'https://localhost:8443/shop/rest/bestellungen/';
    private _initFind: boolean = true;
    private _loadingFind: boolean = false;
    
    private _bestellung: Bestellung = null;
    private _allebestellungen: Array<Bestellung> = [];


    constructor( @Inject(ChartService) private _chartService: ChartService,
        @Inject(Http) private _http: Http, @Inject(SCHEME) scheme: string,
        @Inject(PORT) port: number) {
        this._baseUriBuecher = `${scheme}:${SERVERNAME}:${port}${BASE_PATH_BUECHER}`;
        console.log("ShopService.Konstruktoraufruf" + this._baseUriBuecher);
        this.bestellungheader.append('Accept', 'application/json');
        this.bestellungheader.append('Content-Type', 'application/json');
        this.bestellungheader.append('Authorization', this.basicAuth);
    }
    
    get loadingFind(): boolean { return this._loadingFind; }
    get initFind(): boolean { return this._initFind; }

    get allebestellungen(): Array<Bestellung> { return this._allebestellungen; }
    get bestellung(): Bestellung { return this._bestellung; }
    resetallebestellungen() {
        this._allebestellungen = [];
    }
    
    
    findbyId(id: string) {
        this._loadingFind = true;
        this._initFind = false;
        this._allebestellungen = [];
        return this._http.get(this.bestellunguri + id, {
            headers: this.bestellungheader,
            body: id
        })
            .map((responseData) => { return responseData.json(); })
            .map((bestellung: any) => {
                let result: Array<Bestellung> = [];
                if (bestellung) {
                    result.push(new Bestellung(bestellung.id, bestellung.version, bestellung.gesamtbetrag, bestellung.kundeUri, bestellung.datum, bestellung.bestellpositionen));
                }
                this._loadingFind = false;
                return result;
            })
            .subscribe(res => { this._allebestellungen = res; });
    }

    findbyKundeId(id: string) {
        this._loadingFind = true;
        this._initFind = false;
        this._allebestellungen = [];
        var uri: string = this.bestellunguri + "kunde/" + id
        return this._http.get(uri, {
            headers: this.bestellungheader,
            body: id
        })
            .map((responseData) => { return responseData.json(); })
            .map((tasks: Array<any>) => {
                let result: Array<Bestellung> = [];
                if (tasks) {
                    tasks.forEach((task) => {
                        result.push(new Bestellung(task.id, task.version, task.gesamtbetrag, task.kundeUri, task.datum, task.bestellpositionen));
                    });
                }
                this._loadingFind = false;
                return result;
            })
            .subscribe(res => { this._allebestellungen = res;});

    }
    
        findbyDetailId(id: string) {
         return this._http.get(this.bestellunguri + id, {
            headers: this.bestellungheader,
            body: id
         })
            .map((response) => {
                return response.json();
            })
            .map((bestellung: any) => {
                return new Bestellung(bestellung.id, bestellung.version, bestellung.gesamtbetrag, bestellung.kundeUri, bestellung.datum, bestellung.bestellpositionen)
            })
            .subscribe(res => this._bestellung = res);
    }

}

export const MOCK_OBJECTS_PROVIDER_BESTELLUNGEN: Provider =
    provide(BestellungService, { useClass: BestellungService });