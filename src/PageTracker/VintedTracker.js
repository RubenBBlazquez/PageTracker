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
     * @returns {Promise}
     */
    extractPrices() {
        return new Promise((resolve, reject) => {
            const products = Array.from(document.getElementsByClassName('ItemBox_overlay__Hr4av'));
            const priceLanguage = this.languageVariants[this.userLanguage];

            const productsMapped = products.flatMap((element) => {
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

            return resolve(productsMapped);
        })
    }
}