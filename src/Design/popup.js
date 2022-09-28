import { storage } from '@extend-chrome/storage'
let desiredProductKeys = document.getElementById('desiredKeys');
let telegramBotId = document.getElementById('telegramBotId');
let telegramChatId = document.getElementById('telegramChatId');
let desiredPrice = document.getElementById('desiredPrice');
let timeToReload = document.getElementById('timeToReload');

document.addEventListener('DOMContentLoaded', () => {
    storage.sync.getKeys().then((keys)=>{

        if (keys.length === 0){
            return;
        }

        storage.sync.get().then((basicInformation) => {
            desiredProductKeys.value = basicInformation.desiredProductKeys.join(',')
            telegramBotId.value = basicInformation.telegramBotId;
            telegramChatId.value = basicInformation.telegramChatId;
            desiredPrice.value = basicInformation.desiredPrice;
            timeToReload.value = basicInformation.timeToReload;
        })
    })
})

document.getElementById('saveInfo').addEventListener('click', () => {
    if (!desiredProductKeys){
        alert("Desired product keys is required")
        return;
    }

    if (!desiredProductKeys.value.includes(',')){
        alert("Desired product keys must be separated by commas")
        return;
    }

    desiredProductKeys = desiredProductKeys.value.split(',');

    if (!telegramBotId || telegramBotId.value === ""){
        alert("Telegram Bot Id Is Required")
        return;
    }

    telegramBotId = telegramBotId.value;

    if (!telegramChatId || telegramChatId.value === ""){
        alert("telegram Chat Id Is Required")
        return;
    }

    telegramChatId = telegramChatId.value;

    if (!desiredPrice || desiredPrice.value === ""){
        alert("Desired Price Is Required")
        return;
    }

    desiredPrice = desiredPrice.value;

    if (!timeToReload || timeToReload.value === ""){
        alert("Time To Reload Is Required")
    }

    timeToReload = timeToReload.value;

    storage.sync.set({desiredProductKeys, desiredPrice, telegramBotId, telegramChatId, timeToReload}).then(r => {
        console.log(r)
    })

})
