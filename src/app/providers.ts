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

import {
    MOCK_OBJECTS_PROVIDER
} from '../shopverwaltung/service/artikel_service';
import {
    MOCK_OBJECTS_PROVIDER_BESTELLUNGEN
} from '../shopverwaltung/service/bestellung_service';
import {
    MOCK_OBJECTS_PROVIDER_KUNDE
} from '../shopverwaltung/service/kunde_service';
import {
    MOCK_OBJECTS_PROVIDER_WARENKORB
} from '../shopverwaltung/service/warenkorb_service';

import {HTTP_PROVIDER, PORT_MOCK_PROVIDER} from '../util/util';
// import {HTTPS_PROVIDER} from '../util/util';
// import {PORT_PROVIDER} from '../util/util';

const APP_PROVIDERS: Array<any> = [
    // MOCK_SERVER_PROVIDER,
    MOCK_OBJECTS_PROVIDER,
    MOCK_OBJECTS_PROVIDER_BESTELLUNGEN,
    MOCK_OBJECTS_PROVIDER_KUNDE,
    MOCK_OBJECTS_PROVIDER_WARENKORB,
    // HTTPS_PROVIDER,
    HTTP_PROVIDER,

    // PORT_PROVIDER
    PORT_MOCK_PROVIDER
];

export default APP_PROVIDERS;
