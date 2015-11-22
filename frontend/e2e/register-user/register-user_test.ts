/**
 * Created by Luzius on 22.11.2015.
 */
///<reference path='../../typings/tsdProtractor.d.ts' />

/**
 * Register user registered page e2e tests.
 *
 * Checks the page header only.
 */

'use strict';

import e2eCommon = require('../e2eCommon');


describe('Register user page', function () {

    beforeEach(function () {
        browser.get(e2eCommon.Destinations.registerUser);
    });

    e2eCommon.Tests.itShouldHaveTheDoodleHeader();

});
