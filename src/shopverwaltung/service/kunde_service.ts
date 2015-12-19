import {Inject, provide, Provider} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {ChartDataSet, LinearChartData, CircularChartData, IChart } from 'chart/Chart';

import KundePrivat from '../model/kunde_privat';
import { ChartService, SCHEME, SERVERNAME, PORT, BASE_PATH_BUECHER, isPresent,
        log, isEmpty, isBlank } from '../../util/util';


export default class KundeService {

    private _baseUriKunde: string;
    private username: string = 'admin';
    private password: string = 'p';
    private basicAuth: string = 'Basic ' + window.btoa(`${this.username}:${this.password}`);
    private kundeheader = new Headers();
    private kundeprivatregisterUri: string = 'https://localhost:8443/shop/rest/registrierung/privat';


    constructor( @Inject(ChartService) private _chartService: ChartService,
        @Inject(Http) private _http: Http, @Inject(SCHEME) scheme: string,
        @Inject(PORT) port: number) {
        this._baseUriKunde = `${scheme}:${SERVERNAME}:${port}${BASE_PATH_BUECHER}`;
        console.log("KundenService.Konstruktoraufruf" + this._baseUriKunde);
        this.kundeheader.append('Accept', 'application/json');
        this.kundeheader.append('Content-Type', 'APPLICATION_FORM_URLENCODED');
        this.kundeheader.append('Authorization', this.basicAuth);
    }


    saveprivatkunde(neuerprivatKunde: KundePrivat, successHTTP: () => void, errorHTTP: (response: Response) => void):
        void {

        if (neuerprivatKunde != null) {
            console.log("aAAAAAAAAAAAAAAAAAAAAA");
            this._http.post(this.kundeprivatregisterUri, neuerprivatKunde, {
                headers: this.kundeheader,
                body: neuerprivatKunde
            })
                .map(res => console.log(res))
                .subscribe(
                data => { if (data) { console.log(data) } },
                err => { if (err) { console.log("err" + err) } },
                () => console.log('POST Successful')
                );
        }
        successHTTP();
    }
    
    
}

export const MOCK_OBJECTS_PROVIDER_KUNDE: Provider =
    provide(KundeService, { useClass: KundeService });