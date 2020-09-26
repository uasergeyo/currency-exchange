import React from 'react';
import TABLE_ROW_W from './wrappers/tableRow_w'

function CurrencyTable(props) {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Currency/Current Date</th>
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

