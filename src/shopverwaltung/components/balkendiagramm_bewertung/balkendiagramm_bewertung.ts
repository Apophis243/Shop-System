import {Component} from 'angular2/angular2';

import ArtikelService from '../../service/artikel_service';
import {isAdmin} from '../../../iam/iam_service';

@Component({
    selector: 'balken-diagramm-bewertungen',
    template: `
        <section id="stats">
            <canvas id="chart" width="600" height="400"></canvas>
        </section>
    `
})
export default class BalkendiagrammBewertungen {
    private _elementIdChart: string = 'chart';

    constructor(artikelService: ArtikelService) {
        console.log('BalkenDiagrammBewertungen.constructor()');
        artikelService.setBarChart(this._elementIdChart);
    }

    toString(): string {
        return `BalkenDiagrammBewertungen: {elementIdChart: ${this._elementIdChart}}`;
    }
}