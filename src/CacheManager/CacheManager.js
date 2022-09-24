export class CacheManager{
    constructor() {
    }

    insert(key, value){
        window.sessionStorage.setItem(key, value)
    }

    get(key){
        return window.sessionStorage.getItem(key)
    }

}