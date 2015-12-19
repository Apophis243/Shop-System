import {Inject, provide, Provider} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {ChartDataSet, LinearChartData, CircularChartData, IChart } from 'chart/Chart';
import {ChartService, SCHEME, SERVERNAME, PORT, BASE_PATH_BUECHER, isPresent,
        log, isEmpty, isBlank } from '../../util/util';

import Warenkorbposition from '../model/warenkorbposition';
import Bestellung from '../model/bestellung';
import Bestellposition from '../model/bestellposition';

export default class WarenkorbService {
    
    private _baseUriWarenkorb: string;
    private bestellunguri: string = 'https://localhost:8443/shop/rest/bestellungen';
    private warenkorbpositionuri: string = 'https://localhost:8443/shop/rest/bestellungen/warenkorbposition';
    private warenkorbheader = new Headers();
    private username: string = 'admin';
    private password: string = 'p';
    private basicAuth: string = 'Basic ' + window.btoa(`${this.username}:${this.password}`);
    private _warenkorbpositionen : Array<Warenkorbposition> = [];
    
    constructor( @Inject(ChartService) private _chartService: ChartService,
        @Inject(Http) private _http: Http, @Inject(SCHEME) scheme: string,
        @Inject(PORT) port: number) {
        this._baseUriWarenkorb = `${scheme}:${SERVERNAME}:${port}${BASE_PATH_BUECHER}`;
        console.log("ShopService.Konstruktoraufruf" + this._baseUriWarenkorb);
        this.warenkorbheader.append('Accept', 'application/json');
        this.warenkorbheader.append('Content-Type', 'application/json');
        this.warenkorbheader.append('Authorization', this.basicAuth);
    }
    
    get warenkorbpositionen(): Array<Warenkorbposition> { return this._warenkorbpositionen; }
    
    addposition (anzahl : number, artikelUri: string, kundeUri : string) : boolean {
        
        if (anzahl < 1 || isEmpty(artikelUri) || isEmpty(kundeUri)) {
            return false;
        }
        this._warenkorbpositionen.push(new Warenkorbposition(null, 0, anzahl, artikelUri, kundeUri));
        return true;
    }
    
    deleteposition (artikelUri: string) : boolean {
        
        if (isEmpty(artikelUri)) {
            return false;
        }
        var temparray : Array<Warenkorbposition> = [];
        this._warenkorbpositionen.forEach(position => {
            if (position.artikelUri != artikelUri) {
                temparray.push(position);
            }
        });
        this._warenkorbpositionen = temparray;       
    }
    
    bestellen(kundeUri: string, successHTTP: () => void, errorHTTP: (response: Response) => void) : void {
        
        if (this._warenkorbpositionen.length != 0) {
            
            var bestellpositionen : Array<Bestellposition> = [];
            this._warenkorbpositionen.forEach(warenkorbposition => {
                bestellpositionen.push(new Bestellposition(warenkorbposition.id, 0, warenkorbposition.anzahl, warenkorbposition.artikelUri));
            });
            
            var neuebestellung : Bestellung = new Bestellung(null, 0, 0, kundeUri, null, bestellpositionen);
            this._http.post(this.bestellen, neuebestellung, {
                headers: this.warenkorbheader,
                body: neuebestellung
            })
                .map(res => console.log(res))
                .subscribe(
                data => { if (data) { console.log(data) } },
                err => { if (err) { console.log("err" + err) } },
                () => console.log('POST Successful')
                );
        }    
        this._warenkorbpositionen = [];
        successHTTP();
    }  
    
}


export const MOCK_OBJECTS_PROVIDER_WARENKORB: Provider =
    provide(WarenkorbService, { useClass: WarenkorbService });