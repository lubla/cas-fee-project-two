/**
 * Created by Luzius on 13.10.2015.
 */
///<reference path='../../typings/tsdProtractor.d.ts' />

/**
 * Doodle registered page e2e tests.
 *
 * Checks the page header only.
 */

'use strict';

import e2eCommon = require('../e2eCommon');

describe('Doodle registered page', function () {

    beforeEach(function () {
        browser.get(e2eCommon.Destinations.doodleRegistered);
    });

    e2eCommon.Tests.itShouldHaveTheDoodleHeader();
});
