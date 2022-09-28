export class BaseInformationPageTracker{
    constructor(wantedProductsKeys, telegramChatId, telegramBotId, desiredPrice, timeToReload, activatedPages) {
        this._wantedProductsKeys = wantedProductsKeys;
        this._telegramChatId = telegramChatId;
        this._telegramBotId = telegramBotId;
        this._desiredPrice = desiredPrice;
        this._timeToReload = timeToReload;
        this._activatedPages = activatedPages;
    }


    get wantedProductsKeys() {
        return this._wantedProductsKeys;
    }

    set wantedProductsKeys(value) {
        this._wantedProductsKeys = value;
        return this;
    }

    get telegramChatId() {
        return this._telegramChatId;
    }

    set telegramChatId(value) {
        this._telegramChatId = value;
        return this;
    }

    get telegramBotId() {
        return this._telegramBotId;
    }

    set telegramBotId(value) {
        this._telegramBotId = value;
        return this;
    }

    get desiredPrice() {
        return this._desiredPrice;
    }

    set desiredPrice(value) {
        this._desiredPrice = value;
        return this;
    }

    get timeToReload() {
        return this._timeToReload;
    }

    set timeToReload(value) {
        this._timeToReload = value;
        return this;
    }

    get activatedPages() {
        return this._activatedPages;
    }

    set activatedPages(value) {
        this._activatedPages = value;
    }
}