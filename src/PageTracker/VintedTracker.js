import {BasePageTracker} from "./BasePageTracker";
import {BaseInformationPageTracker} from "./BaseInformation/BaseInformationPageTracker";
import {CacheManager} from "../CacheManager/CacheManager";

export class VintedTracker extends BasePageTracker {

    /**
     *
     * @param {BaseInformationPageTracker} baseInformation
     * @param {CacheManager} cacheManager
     */
    constructor(baseInformation, cacheManager) {
        super(baseInformation, cacheManager);
        this.pageUrl = "vinted"
        this.languageVariants = {'en': 'price', 'es': 'precio', 'fr': 'prix', 'it': 'prezzo' }
        this.cacheManager = cacheManager;
    }

    /**
     * Extracts prices from vinted
     *
     * @returns {[]}
     */
    extractPrices() {
        const products = Array.from(document.getElementsByClassName('ItemBox_overlay__Hr4av'));
        const priceLanguage = this.languageVariants[this.userLanguage];

        return products.flatMap((element) => {
            const title = element.title;

            if (!this._checkIfProductMatchWithDesireKeys(title)){
                return [];
            }

            if (!this._checkIfCanInsertInCache(title, true)){
                return [];
            }

            let price = title.match(`(${priceLanguage}:\\s)([0-9]*[,][0-9]+\\s[€]?)`);

            if (price && price.length > 1) {
                price = price[2]
            }

            return {price, title, 'href': element.href};
        });
    }

    searchPrices() {
        if (this._isTheWebIWantToGetInformation()) {
            console.log('is the web!!!')

            let prices = this.extractPrices();

            if (!prices || prices.length === 0) {
                setTimeout(() => {
                    document.location.reload();

                }, this.baseInformation.timeToReload);
                return;
            }

            for (const price of prices) {
                console.log(price)
                if (this._checkValidPrice(price.price)) {
                    this.notifyTelegram(price).then(() => {
                        console.log('notification sent successfully')
                    });
                }
            }

            setTimeout(() => {
                document.location.reload();

            }, this.baseInformation.timeToReload);
        }
    }
}