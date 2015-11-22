/**
 * Created by Luzius on 22.11.2015.
 */
///<reference path='../../typings/tsdProtractor.d.ts' />

/**
 * Home page e2e tests.
 *
 * Checks the page header only.
 */

'use strict';

import e2eCommon = require('../e2eCommon');


describe('Home registered page', function () {


    beforeEach(function () {
        browser.get(e2eCommon.Destinations.home);
    });

    e2eCommon.Tests.itShouldHaveTheDoodleHeader();

});
