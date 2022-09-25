import {PageTrackerFactory} from "./src/PageTracker/Factory/PageTrackerFactory";
import {BaseInformationPageTracker} from "./src/PageTracker/BaseInformation/BaseInformationPageTracker";

const wantedPokemonKeys = [
    'heartgold', 'soulsilver', 'blanco', 'blanco 2',
    'platino', 'negro 2', 'negra 2', 'diamante',
    'rubi', 'esmeralda', 'zafiro', 'sapphire',
    'pokemon y', 'steelbook',
    'nintendo 3ds'];
const TELEGRAM_CHAT_ID = "657317476";
const TELEGRAM_BOT_ID = "5526897186:AAEX4UKe1DjNPOIwtTcOnbjFRAk_aWq4pC4";
const factory = new PageTrackerFactory();

const baseInformation = new BaseInformationPageTracker(wantedPokemonKeys,TELEGRAM_CHAT_ID, TELEGRAM_BOT_ID, 50, 10000)

const userUrl = document.location.href;

const pageTracker = factory.getPageTracker(baseInformation, userUrl);
pageTracker.searchPrices();