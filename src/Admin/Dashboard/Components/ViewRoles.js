import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Spinner } from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

export default function Roles() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9081/role/all');
                console.log('API Response:', response.data); // Log the entire response
                // Accessing the allRoles array inside response.data
                if (Array.isArray(response.data.allRoles)) {
                    console.log('All Roles:', response.data.allRoles); // Log the roles array
                    // Map the API fields to the table fields
                    const mappedData = response.data.allRoles.map(role => ({
                        id: role.id,
                        name: role.name
                    }));
                    setData(mappedData);
                } else {
                    console.error('Fetched data is not an array:', response.data);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching job data:', error);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            maxW={'100%'}
            w={'auto'}
            bg={'white'}
            boxShadow={'2xl'}
            rounded={'md'}
            overflow={'hidden'}
            p={4}
            m={4}
        >
            <DataTable value={data} sortField="id" sortOrder={-1} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Role ID" sortable style={{ width: '20%' }} />
                <Column field="name" header="Role" sortable style={{ width: '20%' }} />
            </DataTable>
        </Box>
    );
}
