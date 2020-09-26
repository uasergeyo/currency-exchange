import actionPromise from '../actionPromise'
const fetch = require("node-fetch");


export default function actionPromiseGetCurrencies() {

    let count = localStorage.getItem("requestCounter")
    if(count === undefined){
        localStorage.setItem("requestCounter",0)
    }else if(count < 4){
        localStorage.setItem("requestCounter",++count)
    }else if(+count === 4){
        localStorage.setItem("requestCounter",0)
        return  actionPromise('currenciesAPI', Promise.reject(new Error("FIFTH LOAD")))
    }
    
    let promise = fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then(res=>res.json())

    return  actionPromise('currenciesAPI', promise)

}