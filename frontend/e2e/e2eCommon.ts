/**
 * Created by Luzius on 13.10.2015.
 */

export class CssConstants {
    static header = 'a.header__link';

    static test():void {

    }
}

export class TextConstants {
    static header = 'Doodle';
}

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


    static bindingPath(...elements:string[]):string {
        return elements.reduce((previous, current) => previous + '.' + current);
    }
}

export class Tests {
    static hasDoodleHeader() {
        var header = element(by.css.call(null, CssConstants.header));
        expect(header.getText()).toEqual(TextConstants.header);
    }

    static canSetInput(model:string) {
        var input = element(by.model(model));
        input.clear();
        var inputText = 'input test';
        input.sendKeys(inputText);
        expect(input.getAttribute('value')).toEqual(inputText);
    }

    static isEmptyInput(model:string) {
        var input = element(by.model(model));
        expect(input.getAttribute('value')).toEqual('');
    }

    static ngRepeatHasElementCount(elementName:string,
                                   collectionName:string,
                                   elementCount:number) {
        expect(element.all(by.repeater(elementName + ' in ' + collectionName)).count()).toBe(elementCount);
    }

    static ngClickElement(clickCallback:string,
                          clickCallbackParameter:string = ''):protractor.ElementFinder {
        return element(by.css.call(null, '[ng-click="' + clickCallback + '(' + clickCallbackParameter + ')"]'));
    }

}

