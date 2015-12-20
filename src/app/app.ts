import {Component} from 'angular2/angular2';
import {RouteConfig} from 'angular2/router';

import Header from './header';
import Main from './main';
import Menubar from './menubar';
import Footer from './footer';
import APP_ROUTES from './routes';

@Component({
    selector: 'app',
     template: `
        <div class="row">
            <!-- Bootstrap 4:
                    xs:      -  480px ("extra small")
                    sm:      -  767px ("small")
                    md:  768 -  991px ("medium")
                    lg:  992 - 1199px ("large")
                    xl: 1200 px       ("extra large")
                 Bootstrap 3: Kategorie bis 480px gibt es nicht;
                              xs - lg ist um 1 Kategorie nach oben verschoben;
                              xl gibt es noch nicht
            -->
            <header class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <!-- Eigene Komponente fuer die Kopfleiste -->
                <app-header></app-header>
            </header>
        </div>
        <div class="row">
        <menubar></menubar>
        </div>
        <div class="row">

            <main class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                <!-- Eigene Komponente fuer den Haupteil:
                     austauschbar durch Routing -->
                <app-main></app-main>
            </main>
        </div>
        <div class="row">
            <footer class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <!-- Eigene Komponente fuer die Fussleiste -->
                <app-footer></app-footer>
            </footer>
        </div>
    `,
    // Verwendete Komponenten innerhalb der View
    directives: [Header, Footer, Menubar, Main]
})

@RouteConfig(APP_ROUTES)
export default class App {
    constructor() { console.log('App.constructor()'); }

    toString(): string { return 'App'; }
}
