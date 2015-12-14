import {Component, OnDestroy} from 'angular2/angular2';

import SuchKriterien from './such_kriterien';
import SuchErgebnis from './suchergebnis';

@Component({
    selector: 'search_bestellungen',
    template: `
        <such-kriterien></such-kriterien>
        <suchergebnis></suchergebnis>
    `,
    directives: [SuchKriterien, SuchErgebnis]
})
export default class SearchBestellungen implements OnDestroy {
    constructor() { console.log('SearchBestellungen.constructor()'); }
    onDestroy(): void { console.log('SearchBestellungen.onDestroy()'); }

    toString(): String { return 'SearchBestellungen'; }
}
