import {PageTrackerFactory} from "./src/PageTracker/Factory/PageTrackerFactory";
import {BaseInformationPageTracker} from "./src/PageTracker/BaseInformation/BaseInformationPageTracker";
import {storage} from "@extend-chrome/storage";

const DEFAULT_DESIRED_PRODUCT_KEYS = [
    'heartgold', 'soulsilver', 'blanco', 'blanco 2',
    'platino', 'negro 2', 'negra 2', 'diamante',
    'rubi', 'esmeralda', 'zafiro', 'sapphire',
    'pokemon y', 'steelbook',
    'nintendo 3ds'];
const DEFAULT_TELEGRAM_CHAT_ID = "657317476";
const DEFAULT_TELEGRAM_BOT_ID = "5526897186:AAEX4UKe1DjNPOIwtTcOnbjFRAk_aWq4pC4";
const DEFAULT_DESIRED_PRICE = 50;
const DEFAULT_TIME_TO_RELOAD = 10000;

const factory = new PageTrackerFactory();

storage.sync.getKeys().then((keys) => {
    if (keys.length === 0){
        return;
    }

    storage.sync.get().then((basicInformation) => {
        console.log(basicInformation)

        const baseInformation = new BaseInformationPageTracker(
            basicInformation.desiredProductKeys ?? DEFAULT_DESIRED_PRODUCT_KEYS,
            basicInformation.telegramChatId ?? DEFAULT_TELEGRAM_CHAT_ID,
            basicInformation.telegramBotId ?? DEFAULT_TELEGRAM_BOT_ID,
            basicInformation.desiredPrice ?? DEFAULT_DESIRED_PRICE,
            basicInformation.timeToReload ?? DEFAULT_TIME_TO_RELOAD,
            basicInformation.activePages ?? DEFAULT_TIME_TO_RELOAD,
            )

        const userUrl = document.location.href;

        const pageTracker = factory.getPageTracker(baseInformation, userUrl);
        pageTracker.searchPrices();
    })

})

