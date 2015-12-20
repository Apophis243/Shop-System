import {Component, OnInit} from 'angular2/angular2';

import ArtikelService from '../../service/artikel_service';
import {isAdmin} from '../../../iam/iam_service';

@Component({
    selector: 'torten-diagramm-bewertungen',
    template: `
        <section id="stats">
            <canvas id="chart" width="600" height="400"></canvas>
        </section>
    `
})
export default class TortendiagrammBewertungen implements OnInit {
    private _elementIdChart: string = 'chart';

    constructor(private _artikelService: ArtikelService) {
        console.log('TortenDiagrammBewertungen.constructor()');
    }

    onInit(): void { this._artikelService.setPieChart(this._elementIdChart); }

    toString(): string {
        return `TortenDiagrammBewertungen: {elementIdChart: ${this._elementIdChart}}`;
    }
}
