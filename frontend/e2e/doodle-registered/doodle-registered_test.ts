/**
 * Created by Luzius on 13.10.2015.
 */
///<reference path='../../typings/tsdProtractor.d.ts' />

'use strict';

import e2eCommon = require('../e2eCommon');


describe('Doodle registered page', function () {


    beforeEach(function () {
        browser.get(e2eCommon.Destinations.doodleRegistered);
    });

    it('should have the doodle header', function () {
        var header = element(by.css(e2eCommon.CssConstants.header));
        expect(header.getText()).toEqual(e2eCommon.TextConstants.header);
    });

});
