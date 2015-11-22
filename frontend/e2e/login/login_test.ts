/**
 * Created by Luzius on 22.11.2015.
 */
///<reference path='../../typings/tsdProtractor.d.ts' />

/**
 * Login page e2e tests.
 *
 * Checks the page header only.
 */


'use strict';

import e2eCommon = require('../e2eCommon');


describe('Login registered page', function () {


    beforeEach(function () {
        browser.get(e2eCommon.Destinations.login);
    });

    e2eCommon.Tests.itShouldHaveTheDoodleHeader();

});
