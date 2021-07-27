import React from 'react';

const Table = ({
    id,
    columns,
    data,
    renderFooter
}) => (
    <div id={id}>

    {!!data.length &&
        <table>
            <thead>
                <tr>
                    {columns.map(({ label }, i) => (
                        <th data-col={i} key={label}>{label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((datum, i) => 
                    <tr
                        key={datum.id || i}
                    >
                        {columns.map(({ renderVal }, i) => (
                            <td data-col={i} key={i}> { renderVal(datum) } </td>
                        ))}
                    </tr>
                )}    
            </tbody>
        </table>
    }
    </div>
);

export default Table;