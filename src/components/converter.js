import React, { useEffect, useState } from 'react'

function Converter(props) {

    const [isArrow, setIsArrow] = useState(true)
    const [changeQuantity, setChangeQuantity] = useState(1)
    const [getQuantity, setGetQuantity] = useState(1)
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
                        } else if (i.ccy === changeCurrency) {
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
        let [whole, fractional] = (num + "").split('.')
        if (fractional && fractional.length > 2) {
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

