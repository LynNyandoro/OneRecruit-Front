import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

export default function ViewUsers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9081/user/all')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const getStatusClassName = status => {
        switch (status) {
            case 'Inactive':
                return 'Inactive';
            case 'Paused':
                return 'Paused';
            case 'Active':
                return 'Active';
            default:
                return '';
        }
    };

    const statusBodyTemplate = rowData => {
        const statusClassName = getStatusClassName(rowData.status);
        return <div className={`status-cell ${statusClassName}`}>{rowData.status}</div>;
    };

    return (
        <Box borderWidth="1px"
        borderRadius="lg" maxW={'100%'} w={'auto'} bg={'white'} boxShadow={'2xl'} rounded={'md'} overflow={'hidden'} p={4} m={4}>
            <style>
                {`
                    .status-cell {
                        padding: 8px;
                        border-radius: 5px;
                        text-align: center;
                    }

                    .Inactive {
                        background-color: red;
                        color: white;
                    }

                    .Paused {
                        background-color: orange;
                        color: white;
                    }

                    .Active {
                        background-color: green;
                        color: white;
                    }
                `}
            </style>
            <DataTable value={data} sortField="id" sortOrder={1} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="ID" sortable style={{ width: '10%' }}></Column>
                <Column field="firstName" header="First Name" sortable style={{ width: '15%' }}></Column>
                <Column field="lastName" header="Last Name" sortable style={{ width: '15%' }}></Column>
                <Column field="username" header="Username" sortable style={{ width: '15%' }}></Column>
                <Column field="email" header="Email" sortable style={{ width: '20%' }}></Column>
                <Column field="gender" header="Gender" sortable style={{ width: '10%' }}></Column>
                <Column field="age" header="Age" sortable style={{ width: '10%' }}></Column>
                <Column field="role.name" header="Role" sortable style={{ width: '10%' }}></Column>
            </DataTable>
        </Box>
    );
}
