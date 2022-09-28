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
        this.languageVariants = ['price', 'precio', 'prix', 'prezzo']
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
            let profileUrls = Array.from(document.querySelectorAll('div.ItemBox_owner__wsoDc > a'));

            profileUrls = profileUrls.map((anchor)=>{
                return anchor.getAttribute('href')
            });

            const productsMapped = products.flatMap((element, index) => {
                const title = element.title;

                if (!this._checkIfProductMatchWithDesireKeys(title)){
                    return [];
                }

                if (!this._checkIfCanInsertInCache(title, true)){
                    return [];
                }

                let price = title.match(`([${this.languageVariants.join('|')}]+:\\s)([€]?)([0-9]+\\.[0-9]+)([€]?)`);
                console.log(price)

                if (price && price.length > 1) {
                    price = price[3]
                }

                return {price, title, href: element.href, ownerUrl: profileUrls[index]};
            });

            return resolve(productsMapped);
        })
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
            price.price + ' \n' + price.title + '\n   ' + price.href
            + ' --------- PRODUCT OWNER LINK ------------- ' +
            price.ownerUrl,
            () => {}
        );
    }

}