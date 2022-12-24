import {PageTrackerFactory} from "./PageTracker/Factory/PageTrackerFactory";
import {BaseInformationPageTracker} from "./PageTracker/BaseInformation/BaseInformationPageTracker";
import {storage} from "@extend-chrome/storage";
import {
    TRACKER_TYPES,
    DEFAULT_CONTAINERS_INFORMATION,
    DEFAULT_TELEGRAM_CHAT_ID,
    DEFAULT_TELEGRAM_BOT_ID,
    DEFAULT_TIME_TO_RELOAD,
    DEFAULT_DESIRED_PRODUCT_KEYS,
    DEFAULT_DESIRED_PRICE
} from "./PageTracker/Utils/DefaultInformation";

const factory = new PageTrackerFactory();

storage.sync.getKeys().then((keys) => {
    if (keys.length === 0) {
        return;
    }

    storage.sync.get().then((basicInformation) => {
        const vintedInfo = basicInformation?.vintedInfo ?? DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.VINTED];
        const amazonInfo = basicInformation?.amazonInfo ?? DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.AMAZON];
        const wallapopInfo = basicInformation?.wallapopInfo ?? DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.WALLAPOP];

        const baseInformation = new BaseInformationPageTracker(
            basicInformation?.desiredProductKeys ?? DEFAULT_DESIRED_PRODUCT_KEYS,
            basicInformation?.telegramChatId ?? DEFAULT_TELEGRAM_CHAT_ID,
            basicInformation?.telegramBotId ?? DEFAULT_TELEGRAM_BOT_ID,
            basicInformation?.desiredPrice ?? DEFAULT_DESIRED_PRICE,
            basicInformation?.timeToReload ?? DEFAULT_TIME_TO_RELOAD,
            basicInformation?.activatedPages,
            {amazonInfo, vintedInfo, wallapopInfo}
        )

        const userUrl = document.location.href;

        const pageTracker = factory.getPageTracker(baseInformation, userUrl);
        pageTracker.searchPrices();
    })

})

