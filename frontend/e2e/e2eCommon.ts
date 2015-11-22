/**
 * Created by Luzius on 13.10.2015.
 */

/**
 * Common stuff used in the e2e tests.
 */


/**
 * CSS values, used to identify elements.
 */
export class CssConstants {
    static header = 'a.header__link';
}


/**
 * Browser destinations, used to navigate to pages.
 */
export class Destinations {
    static doodleRegistered = '/#/DoodleRegistered';
    static editDoodle = '/#/EditDoodle';
    static login = '/#/Login';
    static registerUser = '/#/RegisterUser';
    static home = '/#/home';
}

/**
 * Expected element texts.
 */
export class TextConstants {
    static header = 'DOODLE';
}

/**
 * Binding names and binding helper helper function to bild binding paths.
 */
export class BindingNames {
    static editDoodleController = 'editDoodle';
    static doodle = 'doodle';
    static title = 'title';
    static place = 'place';
    static dateProposal = 'dateProposal';
    static dateProposals = 'dateProposals';
    static addDateProposal = 'addDateProposal';
    static deleteDateProposal = 'deleteDateProposal';
    static postOrPutDoodle = 'postOrPutDoodle';
    static _id = '_id';

    static editDoodleTitle = BindingNames.bindingPath(BindingNames.editDoodleController, BindingNames.doodle, BindingNames.title);
    static editDoodlePlace = BindingNames.bindingPath(BindingNames.editDoodleController, BindingNames.doodle, BindingNames.place);
    static editDoodleDateProposals = BindingNames.bindingPath(BindingNames.editDoodleController, BindingNames.doodle, BindingNames.dateProposals);
    static editDoodleAddDateProposalCallback = BindingNames.bindingPath(BindingNames.editDoodleController, BindingNames.addDateProposal);
    static editDoodleDeleteDateProposalCallback = BindingNames.bindingPath(BindingNames.editDoodleController, BindingNames.deleteDateProposal);
    static editDoodlePostOrPutDoodleCallback = BindingNames.bindingPath(BindingNames.editDoodleController, BindingNames.postOrPutDoodle);


    /**
     * Combines an binging path elements to a binding path.
     *
     * @param elements   The path elements (open parameter list).
     * @returns {string} The binding path.
     */
    static bindingPath(...elements:string[]):string {
        return elements.reduce((previous, current) => previous + '.' + current);
    }
}

export class Tests {

    /**
     * Checks if a page has the DOODLE header.
     */
    static itShouldHaveTheDoodleHeader() {
        it('should have the doodle header', function () {
            var header = element(by.css.call(null, CssConstants.header));
            expect(header.getText()).toEqual(TextConstants.header);
        });
    }

    /**
     * Checks if an input element can be filled with text.
     *
     * @param model The ng-model of the input element to check.
     */
    static canSetInput(model:string) {
        var input = element(by.model(model));
        input.clear();
        var inputText = 'input test';
        input.sendKeys(inputText);
        expect(input.getAttribute('value')).toEqual(inputText);
    }

    /**
     * Checks if an input element is empty.
     *
     * @param model The ng-model of the input element to check.
     */
    static isEmptyInput(model:string) {
        var input = element(by.model(model));
        expect(input.getAttribute('value')).toEqual('');
    }

    /**
     * Check if an ng-repeat clause based list has a given element count.
     *
     * @param elementName     The name of an element in the ng-repeat clause.
     * @param collectionName  The name of the collection in the ng-repeat clause.
     * @param elementCount    The expected element count.
     */
    static ngRepeatHasElementCount(elementName:string,
                                   collectionName:string,
                                   elementCount:number) {
        expect(element.all(by.repeater(elementName + ' in ' + collectionName)).count()).toBe(elementCount);
    }

    /**
     * Finds an element given by ng-click parameter.
     *
     * @param clickCallback          The name of the ng-click callback function.
     * @param clickCallbackParameter The parameter of the callback function.
     * @returns {ElementFinder}      The element.
     */
    static ngClickElement(clickCallback:string,
                          clickCallbackParameter:string = ''):protractor.ElementFinder {
        return element(by.css.call(null, '[ng-click="' + clickCallback + '(' + clickCallbackParameter + ')"]'));
    }

    /**
     * Checks if the current browser destiniation (url) is an expected destinatation.
     *
     * @param destination       The expected destination.
     * @param excludeParameter  Indicates if the url parameter should be excluded from the check.
     */
    static isDestiniation(destination:string,
                          excludeParameter:boolean = true) {
        browser.getCurrentUrl().then(url => {
            var currentDestination = url.substr(browser.baseUrl.length);
            if(excludeParameter) {
                var parameterStart = currentDestination.indexOf('?');
                if(parameterStart >= 0){
                    currentDestination = currentDestination.substr(0, parameterStart);
                }
            }
            expect(currentDestination).toBe(destination);
        })
    }

}

