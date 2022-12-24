export const DEFAULT_DESIRED_PRODUCT_KEYS = [
    'heartgold', 'soulsilver', 'blanco', 'blanco 2',
    'platino', 'negro 2', 'negra 2', 'diamante',
    'rubi', 'esmeralda', 'zafiro', 'sapphire',
    'pokemon y', 'steelbook',
    'nintendo 3ds'];
export const DEFAULT_TELEGRAM_CHAT_ID = "657317476";
export const DEFAULT_TELEGRAM_BOT_ID = "5526897186:AAEX4UKe1DjNPOIwtTcOnbjFRAk_aWq4pC4";
export const DEFAULT_DESIRED_PRICE = 50;
export const DEFAULT_TIME_TO_RELOAD = 10000;

export const TRACKER_TYPES = {AMAZON: 'Amazon', VINTED: 'Vinted', WALLAPOP: 'Wallapop'}

export const DEFAULT_CONTAINERS_INFORMATION = {
    [TRACKER_TYPES.VINTED]: {
        'productLinkClass': 'web_ui__ItemBox__overlay',
        'productOwnerLinkClass': 'web_ui__ItemBox__owner'
    },
    [TRACKER_TYPES.WALLAPOP]: {
        'productImageClass': 'ItemCard__image',
        'productPriceClass': 'ItemCard__price'
    },
    [TRACKER_TYPES.AMAZON]: {'productPriceClass': 'a-price'},
}