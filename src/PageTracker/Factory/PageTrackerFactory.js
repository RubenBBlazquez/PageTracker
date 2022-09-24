'use strict';

import {IPageTracker} from "../Interface/IPageTracker";
import {BaseInformationPageTracker} from "../BaseInformation/BaseInformationPageTracker";
import {VintedTracker} from "../VintedTracker";
import {WallapopTracker} from "../WallapopTracker";
import {CacheManager} from "../../CacheManager/CacheManager";
import {AmazonTracker} from "../AmazonTracker";

export class PageTrackerFactory{

    constructor() {
        this.cacheManager = new CacheManager();
    }

    /**
     *
     * @param {BaseInformationPageTracker} baseInformation
     * @param userUrl
     *
     * @return {IPageTracker}
     */
    getPageTracker(baseInformation, userUrl){

        if (userUrl.toLowerCase().includes('vinted')){
            return new VintedTracker(baseInformation, this.cacheManager);
        }

        if (userUrl.toLowerCase().includes('wallapop')){
            return new WallapopTracker(baseInformation, this.cacheManager);
        }

        return new AmazonTracker(baseInformation, this.cacheManager);
    }

}