/*
 * Copyright (C) 2015 Juergen Zimmermann, Hochschule Karlsruhe
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {RouteDefinition} from 'angular2/router';

import Home from './home';
import AlleArtikel from '../shopverwaltung/components/artikel/alleartikel/alleartikel';
import ArtikelDetail from '../shopverwaltung/components/artikel/artikel_detail/artikel_detail';
//import AlleAuszahlungen from '../buchungsverwaltung/components/alleauszahlungen/alleauszahlungen';
//import BuchungDetail from '../buchungsverwaltung/components/buchung_detail/buchung_detail';
import CreateArtikel from '../shopverwaltung/components/artikel/artikel_create/create_artikel';
//import SearchBuchung from '../buchungsverwaltung/components/search_buchung/search_buchung';
import EditArtikel from '../shopverwaltung/components/artikel/artikel_edit/artikel_edit';
//import SucheBuecher from '../buchverwaltung/components/suche_buecher/suche_buecher';
import SearchBestellungen from '../shopverwaltung/components/bestellung/bestellung_search/search_buchung';
//import DetailsBuch from '../buchverwaltung/components/details_buch/details_buch';
//import CreateBuch from '../buchverwaltung/components/create_buch/create_buch';
//import UpdateBuch from '../buchverwaltung/components/update_buch/update_buch';
/* tslint:disable:max-line-length */
//import BalkendiagrammBewertungen from '../buchverwaltung/components/balkendiagramm_bewertungen/balkendiagramm_bewertungen';
//import LiniendiagrammBewertungen from '../buchverwaltung/components/liniendiagramm_bewertungen/liniendiagramm_bewertungen';
//import TortendiagrammBewertungen from '../buchverwaltung/components/tortendiagramm_bewertungen/tortendiagramm_bewertungen';
/* tslint:enable:max-line-length */

const APP_ROUTES: Array<RouteDefinition> = [
    // FIXME AngularJS 2.0.0-beta: "as" wird umbenannt in "name"
    // https://github.com/angular/angular/issues/4622
    {path: '/home', as: 'Home', component: Home},
    //{path: '/', as: 'Home', component: Home},
    {path: '/alleartikel', as: 'AlleArtikel', component: AlleArtikel},
    {path: '/artikeldetail/:id', as: 'ArtikelDetail', component: ArtikelDetail},
    //{path: '/alleauszahlungen', as: 'AlleAuszahlungen', component: AlleAuszahlungen},
    //{path: '/buchungdetail/:id', as: 'BuchungDetail', component: BuchungDetail},
    {path: '/createartikel', as: 'CreateArtikel', component: CreateArtikel},
    {path: '/searchbestellungen', as: 'SearchBestellungen', component: SearchBestellungen},
    {path: '/editartikel/:id', as: 'EditArtikel', component: EditArtikel},
    // z.B. Pfad .../detailsBuch/0000...0815
   // {path: '/detailsBuch/:id', as: 'DetailsBuch', component: DetailsBuch},
   // {path: '/updateBuch/:id', as: 'UpdateBuch', component: UpdateBuch},
   // {path: '/createBuch', as: 'CreateBuch', component: CreateBuch},
   // {
   //   path: '/balkendiagramm',
   //   as: 'Balkendiagramm',
    //  component: BalkendiagrammBewertungen
  //  },
   // {
   //   path: '/liniendiagramm',
   //   as: 'Liniendiagramm',
   //   component: LiniendiagrammBewertungen
 //   },
  //  {
    //  path: '/tortendiagramm',
  //    as: 'Tortendiagramm',
  //    component: TortendiagrammBewertungen
    //},
   // {path: '/', redirectTo: ['Home']}
   {path: '/', redirectTo: '/home'}
];

export default APP_ROUTES;
