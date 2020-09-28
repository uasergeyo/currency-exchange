import React, { useEffect } from 'react';
import CURRENCY_TABLE_W from './wrappers/currencyTable_w';
import CONVERTER_W from './wrappers/converter_w';

function Body({ onGetExchangeData, onCreateData, data, status, err}) {


    useEffect(() => {onGetExchangeData()}, [])
    useEffect(() => {onCreateData(dataCreator(data))})

    function dataCreator(d) {
        if (d) {
            return d.slice(0,3).map((i) => ({...i}))
        }
    }

    return (
        <div className="body-wrapper">
            {
                (status === "REJECTED" && err.message === "FIFTH LOAD") ?
                    <div className="errorMsg">
                        Every fifth fetching data you'll get an error, as a requirement of assignment. Don't worry just update your page.
        </div> :
                    (data && data.length > 0) ?
                        <div className = "bodyHolder">
                            <CURRENCY_TABLE_W />
                            <CONVERTER_W />
                        </div> : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            }
        </div>
    )
}

export default Body;