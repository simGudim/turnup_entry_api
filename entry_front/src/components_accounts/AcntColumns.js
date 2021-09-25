import ColumnFilter from "../utils/ColumnFilter"
export const COLUMNS = [
    {
        Header: "Id",
        Footer: 'Id',
        accessor: "id",
        Filter: ColumnFilter,
        disableFilters: true
    },
    {
        Header: "Profile",
        Footer: 'Profile',
        accessor: "profile",
        Filter: ColumnFilter
    },
    {
        Header: "Status",
        Footer: 'Status',
        accessor: "device_state",
        Filter: ColumnFilter
    },
    {
        Header: "Last Poll Time",
        Footer: 'Last Poll Time',
        accessor: "updated_at",
        Filter: ColumnFilter
    },
    {
        Header: "Panel S/N",
        Footer: 'Panel S/N',
        accessor: "panelserial",
        Filter: ColumnFilter
    },
    {
        Header: "Device S/N",
        Footer: 'Device S/N',
        accessor: "serial",
        Filter: ColumnFilter
    }
]