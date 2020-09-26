import React, { useState } from 'react'


function TableRow(props) {

    const [buy, setBuy] = useState()
    const [sale, setSale] = useState()
    const [buyEditing, setBuyEditing] = useState(true);
    const [saleEditing, setSaleEditing] = useState(true);
    const [incorrectValueB, setIncorrectValueB] = useState(false)
    const [incorrectValueS, setIncorrectValueS] = useState(false)

    function editCell({ target }, currencyPB, cb, warningTo) {
        let value = target.value;
        cb(+value)
        if (+value >= currencyPB * 0.9 && +value <= currencyPB * 1.1) {
            warningTo(false)
        }
        else {
            warningTo(true)
        }
    }

    function okBtnHandler(e, currencyPB, idx, type, state = currencyPB, setTypeEditing) {
        e.stopPropagation();
        if (state >= currencyPB * 0.9 && state <= currencyPB * 1.1) {
            let data = props.editableData.map((i,ix)=>{
                if(ix === idx){
                    return ({...i,[type]:state})
                }else{
                    return {...i}
                }
            })
            props.onEditData(data);
            setTypeEditing(true);
            props.onChangeCell(+state)
        }

    }

    function cancelBtnHandler(e, currencyPB, cb, setTypeEditing, warningTo) {
        e.stopPropagation();
        cb(currencyPB);
        setTypeEditing(true);
        warningTo(false);
        props.onChangeCell(currencyPB);
    }


    return (
        <tr>
            <td className="transactionName">{props.data.ccy}/{props.data.base_ccy}</td>
            <td onClick={() => setBuyEditing(false)} className={buyEditing ? "currencyWrapper" : incorrectValueB ? "redBorder" : null}>
                <img className="btnImage editBtn" alt=" " src='/images/edit.png' />
                {
                    buyEditing ?
                        (buy ? buy : props.data.buy) :
                        <>
                            <span className="editButtons">
                                <img className={incorrectValueB ? "disabledBtn" : "btnImage"} alt=" "
                                    onClick={(e) => okBtnHandler(e, props.dataPB[props.index].buy, props.index, "buy", buy, setBuyEditing)}
                                    src='/images/ok-button.png' />
                                <img className="btnImage" alt=" "
                                    onClick={(e) => cancelBtnHandler(e, props.dataPB[props.index].buy, setBuy, setBuyEditing, setIncorrectValueB)}
                                    src='/images/cancel-button.png' />
                            </span>
                            <input type = "number" onChange={(e) => editCell(e, props.dataPB[props.index].buy, setBuy, setIncorrectValueB)} value={buy ? buy : props.data.buy} />
                        </>
                }
            </td>
            <td onClick={() => setSaleEditing(false)} className={saleEditing ? "currencyWrapper" : incorrectValueS ? "redBorder" : null}>
                <img className="btnImage editBtn" alt=" " src='/images/edit.png' />
                {
                    saleEditing ?
                        (sale ? sale : props.data.sale) :
                        <>
                            <span className="editButtons">
                                <img className={incorrectValueS ? "disabledBtn" : "btnImage"} alt=" " onClick={(e) => okBtnHandler(e, props.dataPB[props.index].sale, props.index, "sale", sale, setSaleEditing)} src='/images/ok-button.png' />
                                <img className="btnImage" alt=" " onClick={(e) => cancelBtnHandler(e, props.dataPB[props.index].sale, setSale, setSaleEditing, setIncorrectValueS)} src='/images/cancel-button.png' />
                            </span>
                            <input type = "number" onChange={(e) => editCell(e, props.dataPB[props.index].sale, setSale, setIncorrectValueS)} value={sale ? sale : props.data.sale} />
                        </>
                }
            </td>
        </tr>
    )
}

export default TableRow;