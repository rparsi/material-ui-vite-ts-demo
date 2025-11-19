import { JSX } from 'react';
import Page from '../../component/page';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import UrlForm from './UrlForm';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'col1', headerName: 'Column 1', editable: true, sortable: true },
    { field: 'col2', headerName: 'Column 2', editable: true, sortable: true }
];

const rows: GridRowsProp = [
    { id: 1, col1: 'column 1 value here', col2: 'column 2 value here' },
    { id: 2, col1: 'column 1 value here', col2: 'column 2 value here' },
    { id: 3, col1: 'column 1 value here', col2: 'column 2 value here' }
];

export default function TableDemoPage(): JSX.Element {
    return (
        <Page title='Table Demo'>
            Table demo here.
            <UrlForm/>
            <p>Results</p>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Page>
    );
};