import {BasePageTracker} from "./BasePageTracker";

export class AmazonTracker extends BasePageTracker {

    /**
     *
     * @param {BaseInformationPageTracker} baseInformation
     * @param {CacheManager} cacheManager
     */
    constructor(baseInformation, cacheManager) {
        super(baseInformation, cacheManager);
        this.pageUrl = "amazon"
    }

    /**
     * Extracts prices from the HTML
     *
     * @returns {Promise}
     */
    async extractPrices() {
        return new Promise(async (resolve, reject) => {
            await new Promise(resolve => setTimeout(resolve, 2500));

            const productsPrices = Array.from(document.getElementsByClassName('a-price'))
                .filter((priceElement) => {
                    return !(priceElement.dataset && priceElement.dataset.aStrike);
                });

            console.log(productsPrices)

            return resolve([])
        })
    }


    searchPrices() {
        if (this._isTheWebIWantToGetInformation()) {

            let maxPage = document.getElementsByClassName('s-pagination-button').length;
            let actualPage = 1;

            this.extractPrices().then(async (prices) => {

                for (const price of prices) {
                    if (this._checkValidPrice(price)) {
                        this.notifyTelegram(price).then(() => {
                            console.log('Notification sent successfully')
                        });
                    }
                }

                let actualPages = document.getElementsByClassName('s-pagination-selected');
                actualPage = maxPage;

                if (actualPages.length > 0) {
                    actualPage = parseInt(actualPages[0].textContent)
                }

                const actualPageParam = '&page=' + actualPage;
                const nextPageParam = '&page=' + (actualPage + 1);

                let url = location.href.replace(actualPageParam, nextPageParam)

                if (!location.href.includes('&page')) {
                    url = location.href + nextPageParam
                }

                if (actualPage >= maxPage){
                    url = url.replace(nextPageParam, '&page=1')
                }

                setTimeout(() => {
                    location.href = url
                }, this.baseInformation.timeToReload/4)
            });
        }
    }

}