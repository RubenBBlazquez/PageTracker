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
        this.wallapopInfo = baseInformation.pagesInformation.wallapopInfo
    }

    /**
     * Extracts prices from the HTML
     *
     * @returns {Promise}
     */
    async extractPrices() {
        return new Promise(async (resolve, reject) => {
            await new Promise(resolve => setTimeout(resolve, 2500));

            const divProductsImages = Array.from(document.getElementsByClassName(this.wallapopInfo.productImageClass));
            const divPricesProducts = Array.from(document.getElementsByClassName(this.wallapopInfo.productPriceClass));

            const imageProducts = divProductsImages.map((element) => {
                let image = element.childNodes[0]

                if (!image.src){
                    image = this.iterateTreeToFindProductImage(element.childNodes)
                    image.alt = this.iterateReverseTreeToFindProductTitle(element)
                }

                return image
            })

            const productInformation = imageProducts.flatMap((element, index) => {
                const title = element.alt.replaceAll('"','').toLowerCase();
                console.log(title)
                const price = divPricesProducts[index].textContent.trim();
                let productCode = element?.src?.match('(\\/[0-9a-zA-Z]+)p([0-9]+)\\/');

                if (!productCode || productCode.length === 0) {
                    return [];
                }

                productCode = productCode[2].replace('p', '').replace('/', '');

                const href = 'https://es.wallapop.com/item/' + (title + ' ' + productCode).replaceAll(' ', '-')

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

    iterateTreeToFindProductImage(elements, paso = 0){
        for (const element of elements) {
            if (element.src !== '' && element instanceof HTMLImageElement){
                return element
            }

            if (element.childNodes.length > 0){
                const foundSolution = this.iterateTreeToFindProductImage(element.childNodes, paso+=1)

                if (foundSolution){
                    return foundSolution
                }
            }
        }

        return false
    }

    iterateReverseTreeToFindProductTitle(element, paso = 0){
        while(true){
            if (paso > 150){
                return ''
            }

            if (element?.title){
                return element.title
            }

            element = element.parentElement
            paso+=1
        }
    }
}