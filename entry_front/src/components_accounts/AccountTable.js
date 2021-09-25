import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table"
import { GlobalFilter } from "../utils/GlobalFilter"
import { COLUMNS } from "./AcntColumns"
import { useEffect, useMemo } from "react"
import Dropdown from "./Dropdown"
import { useState } from "react"
import axios from 'axios';



const AccountTable = ({ accounts }) => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => accounts, []);
    const [online, setOnline] = useState(0);
    const [offline, setOffline] = useState(0);

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage, 
        pageOptions,
        gotoPage,
        pageCount,
        prepareRow, 
        state, 
        setGlobalFilter
    } = useTable({
        columns: columns,
        data: data,
        initialState: { pageIndex: 0, pageSize: 20 }
    },
    useFilters, 
    useGlobalFilter, 
    useSortBy, 
    usePagination)

    const { globalFilter, pageIndex } = state

    useEffect(() => {
        axios.get("http://localhost:3000/online_offline")
            .then(response => {
                setOnline(response.data["online"])
                setOffline(response.data["offline"])
            }).catch(error => {
                alert("Could not get the online/offline counts")
            }
        )
    })
    
      

    return (
        <>
        <h2>Accounts</h2>
        <h3>Online: {online}</h3>
        <h3>Offline: {offline}</h3>
        <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter}/>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((element) => (
                    <tr {...element.getHeaderGroupProps()}>
                        {element.headers.map((col) => (
                                <th {...col.getHeaderProps(col.getSortByToggleProps())}>
                                    {col.render('Header')}
                                    <div>{col.canFilter ? col.render('Filter') : null}</div>
                                    <span>
                                        {col.isSorted ? (col.isSortedDesc ? <p>&#8595;</p> : <p>&#8593;</p>): ''}
                                    </span>
                                </th>
                        ))}
                    </tr>
                    ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()}>
                                    {
                                    cell["column"]["Header"] == "Profile" ? 
                                    <Dropdown 
                                        profile = {row.values["profile"]}
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
        <div>
            <button onClick = {() => gotoPage(0)} disabled = {!canPreviousPage}>{'<<'}</button>
            <button onClick = { () => previousPage()} disabled = {!canPreviousPage}>Previous</button>
            <span>
                Page {' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <button onClick = { () => nextPage()} disabled = {!canNextPage}>Next</button>
            <button onClick = {() => gotoPage(pageCount - 1)} disabled = {!canNextPage}>{'>>'}</button>
        </div>
        </>
    )
}

export default AccountTable