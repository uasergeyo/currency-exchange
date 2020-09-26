import React, {useState,useEffect} from 'react';
import TABLE_ROW_W from './wrappers/tableRow_w'

function CurrencyTable(props) {

    const [hyphonetion,setHyphonetion] = useState(false)
    useEffect(()=>{
        if(window.innerWidth < 578){
            setHyphonetion(true)
        }else{
            setHyphonetion(false)
        }
    },[window.innerWidth])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>{hyphonetion ?"Currency/\nCurrent Date" : "Currency/Current Date"}</th>
                        <th>Buy</th>
                        <th>Sale</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data && props.data.length > 0 ? 
                    props.data.map((i, idx) => <TABLE_ROW_W key={idx} index={idx} data={i} />) : null}
                </tbody>
            </table>
        </>
    )
}

export default CurrencyTable;

