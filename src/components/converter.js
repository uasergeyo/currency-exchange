import React, { useEffect, useState } from 'react'

function Converter(props) {

    const [isArrow, setIsArrow] = useState(true)
    const [changeQuantity, setChangeQuantity] = useState(1)
    const [getQuantity, setGetQuantity] = useState()
    const [changeCurrency, setChangeCurrency] = useState()
    const [getCurrency, setGetCurrency] = useState()
    const [currencyNames, setCurrencyNames] = useState([])
    const [isGetQuantity, setIsGetQuantity] = useState(false)

    useEffect(() => {
        if (!currencyNames.length) {
            setCurrencyNames([...new Set([...props.data ? props.data.map(i => i.base_ccy) : [], ...props.data ? props.data.map(i => i.ccy) : []])])
        }
    }, [props.data])
    useEffect(() => currencyConverter(), [changeQuantity, changeCurrency, getCurrency, isArrow, +props.currencyChanges])
    useEffect(() => setChangeCurrency(currencyNames[0]), [currencyNames])
    useEffect(() => setGetCurrency(currencyNames[1]), [currencyNames])
    useEffect(() => {
        if (isGetQuantity) {
            convertGetInput()
        }
    }, [getQuantity])

    function arrowHandler() {
        setIsArrow(!isArrow);
        setChangeCurrency(getCurrency);
        setGetCurrency(changeCurrency);
    }

    function currencyConverter() {
        if (props.data) {
            for (let idx = 0; idx < props.data.length; idx++) {
                let el = props.data[idx]
                if (el.ccy === changeCurrency && el.base_ccy === getCurrency) {
                    setGetQuantity(changeQuantity * el.buy)
                    break
                } else if (el.ccy === getCurrency && el.base_ccy === changeCurrency) {
                    setGetQuantity(changeQuantity / el.sale)
                    console.log(changeQuantity, " / ", el.sale)
                    console.log("props.currencyChanges  ", props.currencyChanges, "\n props.data[0]  ", props.data, "\n getQuantity  ", getQuantity, "\n changeQuantity", changeQuantity)
                    break
                } else if (getCurrency === changeCurrency) {
                    setGetQuantity(changeQuantity)
                    break
                } else if (getCurrency !== "UAH" && changeCurrency !== "UAH") {
                    let buy = null;
                    let sale = null;
                    props.data.forEach(i => {
                        if (i.ccy === getCurrency) {
                            sale = i.sale;
                        } else if (i.ccy === changeCurrency) {
                            buy = i.buy;
                        }
                    })
                    setGetQuantity(changeQuantity / (sale / buy))
                    break
                }
            }
        }
    }

    function convertGetInput() {
        if (props.data) {
            for (let idx = 0; idx < props.data.length; idx++) {
                let el = props.data[idx]
                if (el.ccy === changeCurrency && el.base_ccy === getCurrency) {
                    setChangeQuantity(getQuantity / el.buy)
                    break;
                } else if (el.ccy === getCurrency && el.base_ccy === changeCurrency) {
                    setChangeQuantity(getQuantity * el.sale)
                    break;
                } else if (getCurrency === changeCurrency) {
                    setChangeQuantity(getQuantity)
                    break;
                }
                else if (getCurrency !== "UAH" && changeCurrency !== "UAH") {
                    let buy = null;
                    let sale = null;
                    props.data.forEach(i => {
                        if (i.ccy === getCurrency) {
                            sale = i.sale;
                        } else if (i.ccy == changeCurrency) {
                            buy = i.buy;
                        }
                    })
                    setChangeQuantity(getQuantity * (sale / buy))
                    break
                }
            }
        }
        setIsGetQuantity(false)
    }

    function inputHandler(cb, value, cb2, value2) {
        cb(value)
        if (typeof cb2 === 'function') cb2(value2)
    }

    function fractionLengthHandler(num) {
        let [whole, decimal] = (num + "").split('.')
        if (decimal && decimal.length > 2) {
            return parseFloat(num).toFixed(2)
        } else {
            return num
        }
    }

    return (
        <div className="converterHolder">
            <span className="column">
                <h4 className="transactionHeader">Change</h4>
                <span className="row">
                    <input type="number" onChange={(e) => inputHandler(setChangeQuantity, e.target.value)}
                        value={fractionLengthHandler(changeQuantity)} />
                    <select value={changeCurrency} onChange={e => setChangeCurrency(e.target.value)}>
                        {
                            currencyNames.map((i, idx) => <option key={idx}>{i}</option>)
                        }
                    </select>
                </span>
            </span>
            <img src="images/arrow.png" onClick={arrowHandler} className="arrowImg" alt="" />
            <span className="column">
                <h4 className="transactionHeader">Get</h4>
                <span className="row">
                    <input type="number" onChange={(e) => inputHandler(setGetQuantity, e.target.value, setIsGetQuantity, true)}
                        value={fractionLengthHandler(getQuantity)} />
                    <select value={getCurrency} onChange={(e) => setGetCurrency(e.target.value)}>
                        {
                            currencyNames.map((i, idx) => <option key={idx}>{i}</option>)
                        }
                    </select>
                </span>
            </span>
        </div>
    )
}

export default Converter;































// import React, { useEffect, useState } from 'react'

// function Converter(props) {

//     const [isArrow, setIsArrow] = useState(true)
//     const [changeQuantity, setChangeQuantity] = useState()
//     const [getQuantity, setGetQuantity] = useState()
//     const [changeCurrency, setChangeCurrency] = useState()
//     const [getCurrency, setGetCurrency] = useState()

//     // const [currencyChangeNames, setCurrencyChangeNames] = useState([])
//     // const [currencyGetNames, setCurrencyGetNames] = useState([])

//     // useEffect(() => setCurrencyChangeNames(props.data?props.data.map(i => i.ccy):[]), [props.data])
//     // useEffect(() => setCurrencyGetNames([...new Set(props.data ? props.data.map(i => i.base_ccy):[])]), [props.data])
//     useEffect(() => setCurrencyNames([...new Set([...props.data ? props.data.map(i => i.base_ccy) : [], ...props.data ? props.data.map(i => i.ccy) : []])]), [props.data])
//     const [currencyNames, setCurrencyNames] = useState([])

//     useEffect(() => currencyConverter(), [changeQuantity, getQuantity, changeCurrency, getCurrency, isArrow, props.currencyChanges])
//     useEffect(() => setChangeCurrency(currencyNames[0]), [currencyNames])
//     useEffect(() => setGetCurrency(currencyNames[1]), [currencyNames])
//     // useEffect(() => setChangeCurrency(currencyChangeNames[0]), [currencyChangeNames])
//     // useEffect(() => setGetCurrency(currencyGetNames[0]), [currencyGetNames])
//     // useEffect(() => setChangeCurrency(isArrow ? currencyChangeNames[0] : currencyGetNames[0]),[currencyChangeNames])
//     // useEffect(() => setGetCurrency(isArrow ? currencyGetNames[0] : currencyChangeNames[0]),[currencyGetNames])
//     // useEffect(() => convertGetInput(), [getQuantity])

//     function arrowHandler() {
//         setIsArrow(!isArrow);
//         setChangeCurrency(getCurrency);
//         setGetCurrency(changeCurrency);
//         // console.log('getCurrency == ', getCurrency, "changeCurrency",' === ',changeCurrency)
//     }

//     function currencyConverter() {
//         function convertNotMuchCurrencies(data, change, get, quantity) {
//             let buyToUAH = null;
//             let saleToUAH = null;
//             for (let i of data) {
//                 if (i.ccy === change) {
//                     buyToUAH = i.buy
//                 } else if (i.ccy === get) {
//                     saleToUAH = i.sale
//                 }
//             }
//             setGetQuantity(quantity * buyToUAH / saleToUAH);

//         }
//         // props.data && props.data.forEach((el,idx) => {debugger;
//         if (props.data) {
//             for (let idx = 0; idx < props.data.length; idx++) {
//                 let el = props.data[idx]
//                 if (el.ccy === changeCurrency && el.base_ccy === getCurrency) {
//                     setGetQuantity(changeQuantity * el.buy)
//                     break
//                 } else if (el.ccy === getCurrency && el.base_ccy === changeCurrency) {
//                     setGetQuantity(changeQuantity / el.sale)
//                     break
//                 } else if (getCurrency === changeCurrency) {
//                     setGetQuantity(changeQuantity)
//                     break
//                 } else if (props.data.length - 1 === idx && (el.ccy !== changeCurrency || el.base_ccy !== getCurrency) && "BTC" !== changeCurrency && "BTC" !== getCurrency) {
//                     //     function convertNotNuchCurrencies(data,change,get){
//                     //     let buyToUAH = null;
//                     //     let saleToUAH = null;
//                     //     for (let i of data) {
//                     //         if (i.ccy === change) {
//                     //             buyToUAH = i.buy
//                     //         } else if (i.ccy === get) {
//                     //             saleToUAH = i.sale
//                     //         }
//                     //     }
//                     //     setGetQuantity(changeQuantity * buyToUAH / saleToUAH);
//                     //     break
//                     // }
//                     convertNotMuchCurrencies(props.data, changeCurrency, getCurrency, changeQuantity)
//                     break;
//                 } else if (props.data.length - 1 === idx && (el.ccy !== changeCurrency || el.base_ccy !== getCurrency) && ("BTC" === changeCurrency || "BTC" === getCurrency)) {
//                     let btc_usd = null;
//                     // if (changeCurrency === "BTC") {
//                     //     props.data.forEach(i => {
//                     //         if (i.ccy === "BTC") {
//                     //             btc_usd = i.buy;
//                     //             convertNotMuchCurrencies(props.data, "USD", getCurrency, btc_usd) 
//                     //         }
//                     //     })
//                     //     break;
//                     // } else if (getCurrency === "BTC") {
//                     //     props.data.forEach(i => i.ccy === "BTC" ? btc_usd = i.sale : null)
//                     // }
//                     props.data.forEach(i => {
//                         if (i.ccy === "BTC") {
//                         if (changeCurrency === "BTC") {
//                                     btc_usd = i.buy;
//                                     convertNotMuchCurrencies(props.data, "USD", getCurrency, changeQuantity * btc_usd) 
//                                 }
//                         } else if (getCurrency === "BTC") {
//                             btc_usd = i.sale;
//                             convertNotMuchCurrencies(props.data,changeCurrency, "USD", changeQuantity / btc_usd) 
//                         }
//                     })

//                     // setGetQuantity(changeQuantity);
//                     break;
//                 }
//             }
//         }
//     }

//     function convertGetInput() {
//         props.data && props.data.forEach(el => {
//             if (el.ccy === changeCurrency && el.base_ccy === getCurrency) {
//                 setChangeQuantity(getQuantity / el.buy)
//             } else if (el.ccy === getCurrency && el.base_ccy === changeCurrency) {
//                 setChangeQuantity(getQuantity * el.sale)
//             } else if (getCurrency === changeCurrency) {
//                 setChangeQuantity(getQuantity)
//             }
//         });
//     }

//     return (
//         <div className="converterHolder">
//             <span className="column">
//                 <h4 className="transactionHeader">Change</h4>
//                 <span className="row">
//                     <input type="number" onChange={(e) => setChangeQuantity(e.target.value)} value={changeQuantity} />
//                     <select value={changeCurrency} onChange={e => setChangeCurrency(e.target.value)}>
//                         {/* <select value={isArrow ? changeCurrency : getCurrency} onChange={e => isArrow ? setChangeCurrency(e.target.value) : setGetCurrency(e.target.value)}> */}
//                         {/* <option>{isArrow ? changeCurrency : getCurrency}</option> */}
//                         {
//                             // isArrow ? currencyChangeNames.map((i, idx) =><option key={idx}>{i}</option>) :
//                             //     currencyGetNames.map((i, idx) =><option key={idx}>{i}</option>)
//                             currencyNames.map((i, idx) => <option key={idx}>{i}</option>)
//                         }
//                     </select>
//                 </span>
//             </span>
//             <img src="images/arrow.png" onClick={arrowHandler} className="arrowImg" alt="" />
//             <span className="column">
//                 <h4 className="transactionHeader">Get</h4>
//                 <span className="row">
//                     <input type="number" onChange={(e) => setGetQuantity(e.target.value)} value={getQuantity} />
//                     <select value={getCurrency} onChange={(e) => setGetCurrency(e.target.value)}>
//                         {/* <select value={getCurrency} onChange={(e) => isArrow ? setGetCurrency(e.target.value) : setChangeCurrency(e.target.value)}> */}
//                         {
//                             // isArrow ? currencyGetNames.map((i, idx) =><option key={idx}>{i}</option>) :
//                             //     currencyChangeNames.map((i, idx) => <option key={idx}>{i}</option> )
//                             currencyNames.map((i, idx) => <option key={idx}>{i}</option>)
//                         }
//                     </select>
//                 </span>
//             </span>
//         </div>
//     )
// }

// export default Converter;


