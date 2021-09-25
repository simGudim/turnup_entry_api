import ColumnFilter  from "./../utils/ColumnFilter"

export const COLUMNS = [
    {
        Header: "Id",
        Footer: 'Id',
        accessor: "id",
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: "Date and Time",
        Footer: 'Date and Time',
        accessor: "created_at",
        Filter: ColumnFilter
    },
    {
        Header: "Account #",
        Footer: 'Account #',
        accessor: "acnt",
        Filter: ColumnFilter
    },
    {
        Header: "Event CID",
        Footer: 'Event CID',
        accessor: "cid",
        Filter: ColumnFilter
    },
    {
        Header: "User/Zone",
        Footer: 'User/Zone',
        accessor: "user_id",
        Filter: ColumnFilter
    }
]