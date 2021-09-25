import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from "react-table"
import { GlobalFilter } from "../utils/GlobalFilter"
import { COLUMNS } from "./Columns"
import { useMemo } from "react"

const EventsTable = ({ events }) => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => events, []);
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
        data: data
    }, useFilters, useGlobalFilter, useSortBy, usePagination)
    const { globalFilter, pageIndex } = state
    return (
        <>
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
                                    {cell.render('Cell')}
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

export default EventsTable