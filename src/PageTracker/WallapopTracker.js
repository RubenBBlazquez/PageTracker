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

    searchPrices() {
        if (this._isTheWebIWantToGetInformation()) {
            console.log('is the web!!!')

            this.extractPrices().then((prices) => {
                console.log(prices)

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

                }, this.baseInformation.timeToReload + 2500);
            });
        }
    }
}