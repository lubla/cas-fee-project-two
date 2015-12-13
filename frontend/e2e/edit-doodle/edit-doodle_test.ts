/**
 * Created by Luzius on 13.10.2015.
 */
///<reference path='../../typings/tsdProtractor.d.ts' />

/**
 * Doodle registered page e2e tests.
 *
 * Intensive test of the page!
 */


'use strict';

import e2eCommon = require('../e2eCommon');

describe('Edit doodle page', function () {

    beforeEach(function () {
        browser.get(e2eCommon.Destinations.editDoodle);
    });

    e2eCommon.Tests.itShouldHaveTheDoodleHeader();

    it('should have an empty title', function () {
        e2eCommon.Tests.isEmptyInput(e2eCommon.BindingNames.editDoodleTitle);
    });

    it('can set the title', function () {
        e2eCommon.Tests.canSetInput(e2eCommon.BindingNames.editDoodleTitle);
    });

    it('should have an empty place', function () {
        e2eCommon.Tests.isEmptyInput(e2eCommon.BindingNames.editDoodlePlace);
    });

    it('can set the place', function () {
        e2eCommon.Tests.canSetInput(e2eCommon.BindingNames.editDoodlePlace);
    });

    it('should have an empty date proposal array', function () {
        e2eCommon.Tests.ngRepeatHasElementCount(e2eCommon.BindingNames.dateProposal, e2eCommon.BindingNames.editDoodleDateProposals, 0);
    });

    it('can add a date proposal', function () {
        var addDateProposal = e2eCommon.Tests.ngClickElement(e2eCommon.BindingNames.editDoodleAddDateProposalCallback);

        // Release auto focus of title input element.
        addDateProposal.sendKeys(protractor.Key.TAB);

        addDateProposal.click();
        e2eCommon.Tests.ngRepeatHasElementCount(e2eCommon.BindingNames.dateProposal, e2eCommon.BindingNames.editDoodleDateProposals, 1);
    });

    it('can delete a date proposal', function () {
        var addDateProposal = e2eCommon.Tests.ngClickElement(e2eCommon.BindingNames.editDoodleAddDateProposalCallback);

        // Release auto focus of title input element.
        addDateProposal.sendKeys(protractor.Key.TAB);

        addDateProposal.click();
        var deleteDateProposal = e2eCommon.Tests.ngClickElement(
            e2eCommon.BindingNames.editDoodleDeleteDateProposalCallback,
            e2eCommon.BindingNames.bindingPath(e2eCommon.BindingNames.dateProposal, e2eCommon.BindingNames._id));

        deleteDateProposal.click();
        e2eCommon.Tests.ngRepeatHasElementCount(e2eCommon.BindingNames.dateProposal, e2eCommon.BindingNames.editDoodleDateProposals, 0);
    });

    it('can store the date proposal and go to the doodle registered page', function () {
        var postOrPutDoodle = e2eCommon.Tests.ngClickElement(e2eCommon.BindingNames.editDoodlePostOrPutDoodleCallback);
        postOrPutDoodle.click();

        e2eCommon.Tests.isDestination(e2eCommon.Destinations.doodleRegistered);

    });
});
