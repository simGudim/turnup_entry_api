import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table"
import { useMemo } from "react"
import { PROFILE_COLUMNS } from "./ProfileColumn"
import EditableCell from "./EditableCell"


const ProfileTable = ({ profiles }) => {
    const columns = useMemo(() => PROFILE_COLUMNS, []);
    const data = useMemo(() => profiles, []);
    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows,
        prepareRow, 
        state, 
    } = useTable({
        columns: columns,
        data: data,
    })

    return (
        <>
        <h2>Security Profiles</h2>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((element) => (
                    <tr {...element.getHeaderGroupProps()}>
                        {element.headers.map((col) => (
                                <th {...col.getHeaderProps()}>
                                    {col.render('Header')}
                                </th>
                        ))}
                    </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>
                                     {
                                    cell["column"]["Header"] == "Poll Time" ? 
                                    <EditableCell 
                                        polltime = {row.values["polltime"]}
                                        row = {row}
                                    />
                                    : cell.render('Cell')
                                    }
                                </td>
                            ))
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default ProfileTable