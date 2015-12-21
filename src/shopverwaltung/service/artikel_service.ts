import {Inject, provide, Provider} from 'angular2/angular2';
import {Http, Headers, Response} from 'angular2/http';
import {ChartDataSet, LinearChartData, CircularChartData, IChart } from 'chart/Chart';

import Artikel from '../model/artikel';
import {IArtikelServer, IArtikelForm} from '../model/artikel';
import {ChartService, SCHEME, SERVERNAME, PORT, BASE_PATH_BUECHER, isPresent,
        log, isEmpty, isBlank } from '../../util/util';


export default class ArtikelService {

    private _baseUriArtikel: string;
    private _alleartikel: Array<Artikel> = [];
    private _artikel: Artikel = null;
    private _initFind: boolean = true;
    private _loadingFind: boolean = false;
    private username: string = 'admin';
    private password: string = 'p';
    private basicAuth: string = 'Basic ' + window.btoa(`${this.username}:${this.password}`);
    private artikelheader = new Headers();
    private artikeluri: string = 'https://localhost:8443/shop/rest/artikel';


    constructor( 
        @Inject(ChartService) private _chartService: ChartService,
        @Inject(Http) private _http: Http, @Inject(SCHEME) scheme: string,
        @Inject(PORT) port: number) {
        this._baseUriArtikel = `${scheme}:${SERVERNAME}:${port}${BASE_PATH_BUECHER}`;
        console.log("ShopService.Konstruktoraufruf" + this._baseUriArtikel);
        this.artikelheader.append('Accept', 'application/json');
        this.artikelheader.append('Content-Type', 'application/json');
        this.artikelheader.append('Authorization', this.basicAuth);
    }

    get loadingFind(): boolean { return this._loadingFind; }
    get initFind(): boolean { return this._initFind; }

    get alleartikel(): Array<Artikel> { return this._alleartikel; }
    get artikel(): Artikel { return this._artikel; }
    
    getall() {
        this._loadingFind = true;
        this._initFind = false;
        return this._http.get('https://localhost:8443/shop/rest/katalog')
            .map((responseData) => {
                return responseData.json();
            })
            .map((tasks: Array<any>) => {
                let result: Array<Artikel> = [];
                if (tasks) {
                    tasks.forEach((task) => {
                        result.push(new Artikel(task.id, task.bezeichnung, task.kategorie, task.preis, task.ausgesondert, task.rating, task.version));
                    });
                }
                this._loadingFind = false;
                return result;
            });
    }


    findbyId(id: string) {
        return this._http.get("https://localhost:8443/shop/rest/katalog/" + id)
            .map((response) => {
                return response.json();
            })
            .map((artikel: any) => {
                return new Artikel(artikel.id, artikel.bezeichnung, artikel.kategorie, artikel.preis, artikel.ausgesondert, artikel.rating, artikel.version)
            })
            .subscribe(res => this._artikel = res);
    }


    save(neuerArtikel: Artikel, successHTTP: () => void, errorHTTP: (response: Response) => void):
        void {

        if (neuerArtikel != null) {
            this._http.post(this.artikeluri, neuerArtikel, {
                headers: this.artikelheader,
                body: neuerArtikel
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
    
    //@log
    update(changedartikel: Artikel, successHTTP: () => void, errorHTTP: (response: Response) => void):
        void {

        if (changedartikel != null) {
            this._http.put(this.artikeluri, changedartikel, {
                headers: this.artikelheader
            })
                .map(res => console.log(res))
                .subscribe(
                data => { if (data) { console.log(data) } },
                err => { if (err) { console.log("err" + err) } },
                () => console.log('PUT Successful')
                );
        }
        successHTTP();
    }
    
    //@log
    setBarChart(elementIdChart: string): void {
        const uri: string = 'https://localhost:8443/shop/rest/katalog';
        const success: Function = (response: Response) => {
            headers: this.artikelheader,
            this._createBarChart(
                elementIdChart, this._responseToArrayArtikel(response));
        };
        const error: Function =
            (response: Response) => { console.error('response=', response); };
        const next: ((response: Response) => void) = (response: Response) => {
            if (response.status === 200) {
                success(response);
                return;
            }
            error(response);
        };
           
        this._http.get(uri).subscribe(next);
    }

    //@log
    setLinearChart(elementIdChart: string): void {
        const uri: string = 'https://localhost:8443/shop/rest/katalog';
        const success: Function = (response: Response) => {
            headers: this.artikelheader,
            this._createLineChart(
                elementIdChart, this._responseToArrayArtikel(response));
        };
        const error: Function =
            (response: Response) => { console.error('response=', response); };
        const next: ((response: Response) => void) = (response: Response) => {
            if (response.status === 200) {
                success(response);
                return;
            }
            error(response);
        };

        this._http.get(uri).subscribe(next);
    }

    //@log
    setPieChart(elementIdChart: string): void {
        const uri: string = 'https://localhost:8443/shop/rest/katalog';
        const success: Function = (response: Response) => {
            headers: this.artikelheader,
            this._createPieChart(
                elementIdChart, this._responseToArrayArtikel(response));
        };
        const error: Function =
            (response: Response) => { console.error('response=', response); };
        const next: ((response: Response) => void) = (response: Response) => {
            if (response.status === 200) {
                success(response);
                return;
            }
            error(response);
        };

        this._http.get(uri).subscribe(next);
    }

    toString(): String {
        return `ArtikelService: {artikel: ${JSON.stringify(this._artikel, null, 2)}}`;
    }
    
     @log
    private _responseToArrayArtikel(response: Response): Array<Artikel> {
        const jsonArray: Array<IArtikelServer> =
            <Array<IArtikelServer>>(response.json());
        return jsonArray.map((jsonObjekt: IArtikelServer) => {
            return Artikel.fromServer(jsonObjekt);
        });
    }
    
    private _createBarChart(elementIdChart: string, artikel: Array<Artikel>):
        void {
           
        const labels: Array<string> = artikel.map((artikel: Artikel) => artikel.id);
        const datasets: Array<ChartDataSet> = [
            {
              label: 'Bewertungen',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              data: artikel.map((artikel: Artikel) => artikel.rating)
            }
        ];
        
        const data: LinearChartData = {labels: labels, datasets: datasets};
        console.log('ArtikelService._createBarChart(): labels: ', labels);

        const chart: IChart = this._chartService.getChart(elementIdChart);
        if (isPresent(chart) && isPresent(datasets[0].data)
            && datasets[0].data.length !== 0) {
            // TODO legendTemplate ergaenzen
            chart.Bar(data);
        }
    }

    private _createLineChart(elementIdChart: string, artikel: Array<Artikel>):
        void {
        const labels: Array<string> = artikel.map((artikel: Artikel) => artikel.id);
        const datasets: Array<ChartDataSet> = [
            {
              label: 'Bewertungen',
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              data: artikel.map((artikel: Artikel) => artikel.rating)
            }
        ];
        const data: LinearChartData = {labels: labels, datasets: datasets};

        // TODO Das Datenmodell fuer Chart.js hat sich in 2.0 geaendert
        //      https://github.com/nnnick/Chart.js/blob/v2.0-alpha/README.md
        //      chart.d.ts gibt es noch nicht fuer 2.0
        const chart: IChart = this._chartService.getChart(elementIdChart);
        if (isPresent(chart) && isPresent(datasets[0].data)
            && datasets[0].data.length !== 0) {
            chart.Line(data);
        }
    }

    private _createPieChart(elementIdChart: string, artikel: Array<Artikel>):
        void {
        const pieData: Array<CircularChartData> =
            new Array<CircularChartData>(artikel.length);
        artikel.forEach((artikel: Artikel, i: number) => {
            const data: CircularChartData = {
                value: artikel.rating,
                color: this._chartService.getColorPie(i),
                highlight: this._chartService.getHighlightPie(i),
                label: `${artikel.id}`
            };
            pieData[i] = data;
        });

        const chart: IChart = this._chartService.getChart(elementIdChart);
        if (isPresent(chart) && pieData.length !== 0) {
            chart.Pie(pieData);
        }
    }
    
    /*
    //@log
    find(kriterien: IBuchungForm, errorHTTP: (response: Response) => void): void {
        this._loadingFind = true;
        this._initFind = false;
        this._buchungen = this._allebuchungen;

        const {titel, kategorie, einzahlung, auszahlung}: any = kriterien;

        if (!isEmpty(titel)) {
            this._buchungen = this._buchungen.filter((buchung: Buchung) => buchung.containsTitel(titel));
        }
        if (!isEmpty(kategorie)) {
            this._buchungen = this._buchungen.filter((buchung: Buchung) => buchung.isKategorie(kategorie));
        }
        if (!isEmpty(einzahlung) && !isEmpty(auszahlung)) {           
        }
        else if (!isEmpty(einzahlung)) {
            this._buchungen =
                this._buchungen.filter((buchung: Buchung) => buchung.einzahlung == true);
        }
        else if (!isEmpty(auszahlung)) {
            this._buchungen =
                this._buchungen.filter((buchung: Buchung) => buchung.auszahlung == true);
        }
        this._loadingFind = false;
        console.log('Filter nach Buechern Ergebnis: ', this._buchungen);
    }
    
    @log
    findById(id: string, errorHTTP: (response: Response) => void) : void {
        this._buchung = null;
        for (var i = 0; i<this._allebuchungen.length; i++) {
            var idstring : string = this._allebuchungen[i].id.toString();
            if (id == idstring) {
                this._buchung = this._allebuchungen[i];
            }
        }
    }
    
    save(neueBuchung: Buchung, successHTTP: () => void, errorHTTP: (response: Response) => void):
        void {
            if (neueBuchung != null) {
                neueBuchung.id = nextId(this._allebuchungen[this._allebuchungen.length-1].id)
                this._allebuchungen.push(neueBuchung);
            }
            this._buchungen = this._allebuchungen;
            successHTTP();
    }
    
    @log
    delete(buchung: Buchung, successHTTP: () => void, errorHTTP: (response: Response) => void): void {
        this._allebuchungen = this._allebuchungen.filter((b: Buchung) => b.id !== buchung.id);
        this._buchungen = this._allebuchungen;
    }

 
    get buchung() : Buchung { return this._buchung;}
    */
}

export const MOCK_OBJECTS_PROVIDER: Provider =
    provide(ArtikelService, { useClass: ArtikelService });