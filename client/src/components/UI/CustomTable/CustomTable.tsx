import './CustomTable.scss'
import {CustomTableProps} from "../../../types.ts";

const CustomTable = ({tableClass, tableKey, data, columns}: CustomTableProps) => {
    return (
        <table className={`custom-table ${tableClass ? tableClass : ""}`}>
            <thead>
            <tr>
                {columns.map(column => (
                    <th className={column.className} key={column.key} style={{width: column.width || "auto"}}>{column.label}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map(item => (
                <tr key={item[tableKey]}>
                    {columns.map(column => (
                        <td className={column.className} key={column.key}>
                            {column.render(item)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CustomTable;