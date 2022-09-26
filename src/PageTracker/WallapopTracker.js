import {BasePageTracker} from "./BasePageTracker";
import {BaseInformationPageTracker} from "./BaseInformation/BaseInformationPageTracker";
import {CacheManager} from "../CacheManager/CacheManager";

export class WallapopTracker extends BasePageTracker {

    /**
     *
     * @param {BaseInformationPageTracker} baseInformation
     * @param {CacheManager} cacheManager
     */
    constructor(baseInformation, cacheManager) {
        super(baseInformation, cacheManager);
        this.pageUrl = "wallapop"
    }

    /**
     * Extracts prices from the HTML
     *
     * @returns {Promise}
     */
    async extractPrices() {
        return new Promise(async (resolve, reject) => {
            await new Promise(resolve => setTimeout(resolve, 2500));

            const divProductsImages = Array.from(document.getElementsByClassName('ItemCard__image'));
            const divPricesProducts = Array.from(document.getElementsByClassName('ItemCard__price'));

            const imageProducts = divProductsImages.map((element) => {
                return element.childNodes[0]
            })

            const productInformation = imageProducts.flatMap((element, index) => {
                const title = element.alt;
                const price = divPricesProducts[index].textContent.trim();
                let productCode = element.src.match('(p[0-9a-zA-z]+\\/)');

                if (productCode.length === 0) {
                    return [];
                }

                productCode = productCode[0].replace('p', '').replace('/', '');

                const href = 'https://es.wallapop.com/item/' + (title + ' ' + productCode).replaceAll(' ', '-')

                console.log(href)
                if (!this._checkIfCanInsertInCache(href, true)) {
                    return [];
                }

                if (!this._checkIfProductMatchWithDesireKeys(title)) {
                    return [];
                }

                return {title, price, 'href': href}
            })

            return resolve(productInformation)
        })
    }
}