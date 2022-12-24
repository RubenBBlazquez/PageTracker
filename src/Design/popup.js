import {storage} from '@extend-chrome/storage'
import chromep from "chrome-promise";
import {TRACKER_TYPES, DEFAULT_CONTAINERS_INFORMATION} from "../PageTracker/Utils/DefaultInformation";

let desiredProductKeys = document.getElementById('desiredKeys');
let telegramBotId = document.getElementById('telegramBotId');
let telegramChatId = document.getElementById('telegramChatId');
let desiredPrice = document.getElementById('desiredPrice');
let timeToReload = document.getElementById('timeToReload');

const editClassInformationAmazon = document.getElementById('editClassInformationAmazonButton');
const saveInformationAmazon = document.getElementById('saveInformationAmazon');
const amazon = document.getElementById('amazon');

const editClassInformationWallapop = document.getElementById('editClassInformationWallapopButton');
const saveInformationWallapop = document.getElementById('saveInformationWallapop');
const wallapop = document.getElementById('wallapop');

const editClassInformationVinted = document.getElementById('editClassInformationVintedButton');
const saveInformationVinted = document.getElementById('saveInformationVinted');
const vinted = document.getElementById('vinted');

document.addEventListener('DOMContentLoaded', () => {
    storage.sync.getKeys().then((keys) => {

        if (keys.length === 0) {
            return;
        }

        storage.sync.get().then((basicInformation) => {
            desiredProductKeys.value = basicInformation?.desiredProductKeys?.join(',') || ''
            telegramBotId.value = basicInformation?.telegramBotId || '';
            telegramChatId.value = basicInformation?.telegramChatId || '';
            desiredPrice.value = basicInformation?.desiredPrice || '';
            timeToReload.value = basicInformation?.timeToReload || '';

            if (basicInformation?.activatedPages){
                amazon.checked = basicInformation?.activatedPages[amazon.id];
                wallapop.checked = basicInformation?.activatedPages[wallapop.id];
                vinted.checked = basicInformation?.activatedPages[vinted.id];
            }

            DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.VINTED] = basicInformation?.vintedInfo || DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.VINTED];
            DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.AMAZON] = basicInformation?.amazonInfo || DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.AMAZON];
            DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.WALLAPOP] = basicInformation?.wallapopInfo || DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.WALLAPOP];
        })

    })
})

document.getElementById('saveInfo').addEventListener('click', () => {
    if (!desiredProductKeys) {
        alert("Desired product keys is required")
        return;
    }

    if (!desiredProductKeys.value.includes(',')) {
        alert("Desired product keys must be separated by commas")
        return;
    }

    desiredProductKeys = desiredProductKeys.value.split(',');

    if (!telegramBotId || telegramBotId.value === "") {
        alert("Telegram Bot Id Is Required")
        return;
    }

    telegramBotId = telegramBotId.value;

    if (!telegramChatId || telegramChatId.value === "") {
        alert("telegram Chat Id Is Required")
        return;
    }

    telegramChatId = telegramChatId.value;

    if (!desiredPrice || desiredPrice.value === "") {
        alert("Desired Price Is Required")
        return;
    }

    desiredPrice = desiredPrice.value;

    if (!timeToReload || timeToReload.value === "") {
        alert("Time To Reload Is Required")
    }

    timeToReload = timeToReload.value;

    const activatedPages = {[amazon.id]: amazon.checked, [wallapop.id]: wallapop.checked, [vinted.id]: vinted.checked}

    storage.sync.set({
        desiredProductKeys,
        desiredPrice,
        telegramBotId,
        telegramChatId,
        timeToReload,
        activatedPages
    }).then(r => {
        console.log(r)
    })

    chromep.tabs.reload();
})

editClassInformationAmazon.addEventListener('click', () => {
    console.log(DEFAULT_CONTAINERS_INFORMATION)

    const amazonInfo = DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.AMAZON]

    for (const key of Object.keys(amazonInfo)) {
        document.getElementById(`${key}${TRACKER_TYPES.AMAZON}`).value = amazonInfo[key]
    }
})

editClassInformationWallapop.addEventListener('click', () => {
    const wallapopInfo = DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.WALLAPOP]

    for (const key of Object.keys(wallapopInfo)) {
        document.getElementById(`${key}${TRACKER_TYPES.WALLAPOP}`).value = wallapopInfo[key]
    }
})

editClassInformationVinted.addEventListener('click', () => {
    const vintedInfo = DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.VINTED]

    for (const key of Object.keys(vintedInfo)) {
        document.getElementById(`${key}${TRACKER_TYPES.VINTED}`).value = vintedInfo[key]
    }
})

saveInformationAmazon.addEventListener('click', () => {
    const amazonInfo = DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.AMAZON]

    for (const key of Object.keys(amazonInfo)) {
        const value = document.getElementById(`${key}${TRACKER_TYPES.AMAZON}`).value

        if (!value){
            continue;
        }

        amazonInfo[key] = value
    }

    storage.sync.set({
        amazonInfo
    }).then(r => {
        console.log(r)
    })
})

saveInformationWallapop.addEventListener('click', () => {
    const wallapopInfo = DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.WALLAPOP]

    for (const key of Object.keys(wallapopInfo)) {
        const value = document.getElementById(`${key}${TRACKER_TYPES.WALLAPOP}`).value

        if (!value){
            continue;
        }

        wallapopInfo[key] = value
    }

    storage.sync.set({
        wallapopInfo
    }).then(r => {
        console.log(r)
    })
})

saveInformationVinted.addEventListener('click', () => {
    const vintedInfo = DEFAULT_CONTAINERS_INFORMATION[TRACKER_TYPES.VINTED]

    for (const key of Object.keys(vintedInfo)) {
        const value = document.getElementById(`${key}${TRACKER_TYPES.VINTED}`).value

        if (!value){
            continue;
        }

        vintedInfo[key] = value
    }

    storage.sync.set({
       vintedInfo
    }).then(r => {
        console.log(r)
    })
})