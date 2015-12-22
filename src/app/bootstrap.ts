// In tsconfig.json *wird* man aehnlich wie bei SystemJS konfigurieren koennen,
// wo nicht-relative Pfade wie z.B. angular2/angular2 zu suchen sind.
// Derzeit sucht TypeScript nur in node_modules.
// https://github.com/Microsoft/TypeScript/issues/5039
// https://github.com/DefinitelyTyped/DefinitelyTyped

// AngularJS unterstuetzt npm als Package Manager. Deshalb werden .d.ts-Dateien
// im Verzeichnis node_modules bereitgestellt.
// https://github.com/angular/angular/issues/5248#issuecomment-156886060

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

// 2 Deprecations https://github.com/angular/zone.js/issues/153
import 'zone.js';
// Decorators (Proposal fuer Metadaten in ES7) emulieren
import 'reflect-metadata';

import {bootstrap, provide} from 'angular2/angular2';
import {
    ROUTER_PROVIDERS,
    ROUTER_PRIMARY_COMPONENT,
    APP_BASE_HREF
} from 'angular2/router';
// import {LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import App from './app';
import APP_INJECTABLES from './injectables';
import APP_PROVIDERS from './providers';

bootstrap(
    App,
    [
      APP_INJECTABLES,
      APP_PROVIDERS,
      ROUTER_PROVIDERS,
      provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
      provide(APP_BASE_HREF, {useValue: '/'}),
      HTTP_PROVIDERS
    ])
    .then((success: any) => console.log(success))
    .catch((error: any) => console.error(error));
