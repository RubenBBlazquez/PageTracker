import {IPageTracker} from "./Interface/IPageTracker";
import {BaseInformationPageTracker} from "./BaseInformation/BaseInformationPageTracker";
import {CacheManager} from "../CacheManager/CacheManager";

export class BasePageTracker extends IPageTracker {
    /**
     * @param {BaseInformationPageTracker} baseInformation
     * @param {CacheManager} cacheManager
     */
    constructor(baseInformation, cacheManager) {
        super();
        this.baseInformation = baseInformation;
        this.pageUrl = "";
        this.userLanguage = window.navigator.userLanguage || window.navigator.language;
        this.userLanguage = this.userLanguage.split('-')[0]
        this.cacheManager = cacheManager;
    }

    _isUrlToTrackActivated(){
        const activatedUrls = Object.keys(this.baseInformation.activatedPages);

        return activatedUrls.includes(this.pageUrl) && this.baseInformation.activatedPages[this.pageUrl]
    }

    /**
     * Method to know if we are searching in the correct page
     *
     * @returns {boolean}
     */
    _isTheWebIWantToGetInformation() {
        const actualDirection = document.location.href.toLowerCase()

        return actualDirection.includes(this.pageUrl) === true;
    }

    /**
     * Method to send notification to telegram bot
     *
     * @param price
     * @returns {Promise<void>}
     */
    async notifyTelegram(price) {
        console.log("Notifiying with price:" + price);

        await fetch(
            "https://api.telegram.org/bot" +
            this.baseInformation.telegramBotId +
            "/sendMessage?chat_id=" +
            this.baseInformation.telegramChatId +
            "&text=!!!!New Offer!!!!! \n\n" +
            price.price + ' \n' + price.title + '\n   ' + price.href,
            () => {}
        );
    }

    /**
     * Checks if is below my desired price
     * @param {*} price
     *
     * @returns
     */
    _checkValidPrice(price) {
        let clearPrice = price.replace("€", "").replace(",", ".").replace(" ","");
        console.log("Price found:" + clearPrice);
        return Number(clearPrice) <= this.baseInformation.desiredPrice;
    }

    /**
     *
     * @param key
     * @param value
     *
     * @returns {boolean}
     *
     * @protected
     */
    _checkIfCanInsertInCache(key, value){
        if (this.cacheManager.get(key) !== null){
            return false;
        }

        this.cacheManager.insert(key, value);

        return true;
    }

    /**
     *
     * @param productTitle
     *
     * @returns {boolean}
     *
     * @protected
     * */
    _checkIfProductMatchWithDesireKeys = (productTitle) => {
        for (const key of this.baseInformation.wantedProductsKeys) {
            if (productTitle.toLowerCase().includes(key)){
                return true;
            }
        }

        return false;
    }

    extractPrices(){}

    searchPrices() {
        if (this._isTheWebIWantToGetInformation() && this._isUrlToTrackActivated()) {
            this.extractPrices().then((prices) => {
                if (!prices || prices.length === 0) {
                    setTimeout(() => {
                        document.location.reload();

                    }, this.baseInformation.timeToReload);
                    return;
                }

                for (const price of prices) {
                    if (this._checkValidPrice(price.price)) {
                        this.notifyTelegram(price).then(() => {
                            console.log('notification sent successfully')
                        });
                    }
                }

                setTimeout(() => {
                    document.location.reload();
                }, this.baseInformation.timeToReload);
            });
        }
    }
}