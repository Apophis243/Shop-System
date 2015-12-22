import {RouteDefinition} from 'angular2/router';

import Home from './home';
import AlleArtikel from '../shopverwaltung/components/artikel/alleartikel/alleartikel';
import ArtikelDetail from '../shopverwaltung/components/artikel/artikel_detail/artikel_detail';
import BestellungDetail from '../shopverwaltung/components/bestellung/bestellung_detail/bestellung_detail';
import CreateArtikel from '../shopverwaltung/components/artikel/artikel_create/create_artikel';
import EditArtikel from '../shopverwaltung/components/artikel/artikel_edit/artikel_edit';
import SearchBestellungen from '../shopverwaltung/components/bestellung/bestellung_search/search_buchung';
import KundeRegisterLandingPage from '../shopverwaltung/components/kunde/kunde_register/kunde_register_landingpage';
import KundeRegisterPrivat from '../shopverwaltung/components/kunde/kunde_register/kunde_register_privat';
import Login from '../shopverwaltung/components/login/login';
import Warenkorb from '../shopverwaltung/components/warenkorb/warenkorb';
import BalkendiagrammBewertungen from '../shopverwaltung/components/balkendiagramm_bewertung/balkendiagramm_bewertung';
import LiniendiagrammBewertungen from '../shopverwaltung/components/liniendiagramm_bewertung/liniendiagramm_bewertung';
import TortendiagrammBewertungen from '../shopverwaltung/components/tortendiagramm_bewertung/tortendiagramm_bewertung';


const APP_ROUTES: Array<RouteDefinition> = [
    // FIXME AngularJS 2.0.0-beta: "as" wird umbenannt in "name"
    // https://github.com/angular/angular/issues/4622
    {path: '/home', as: 'Home', component: Home},
    {path: '/alleartikel', as: 'AlleArtikel', component: AlleArtikel},
    {path: '/artikeldetail/:id', as: 'ArtikelDetail', component: ArtikelDetail},
    {path: '/bestellungdetail/:id', as: 'BestellungDetail', component: BestellungDetail},
    {path: '/createartikel', as: 'CreateArtikel', component: CreateArtikel},
    {path: '/searchbestellungen', as: 'SearchBestellungen', component: SearchBestellungen},
    {path: '/editartikel/:id', as: 'EditArtikel', component: EditArtikel},
    {path: '/register', as: 'KundeRegisterLandingPage', component: KundeRegisterLandingPage},
    {path: '/registerprivat', as: 'KundeRegisterPrivat', component: KundeRegisterPrivat},
    {path: '/login', as: 'Login', component: Login},
	{path: '/warenkorb', as: 'Warenkorb', component: Warenkorb},
    {
      path: '/balkendiagramm',
      as: 'Balkendiagramm',
      component: BalkendiagrammBewertungen
    },
    {
      path: '/liniendiagramm',
      as: 'Liniendiagramm',
      component: LiniendiagrammBewertungen
    },
    {
      path: '/tortendiagramm',
      as: 'Tortendiagramm',
      component: TortendiagrammBewertungen
    },
    // {path: '/', redirectTo: ['Home']}
    {path: '/', redirectTo: '/home'}
];

export default APP_ROUTES;
