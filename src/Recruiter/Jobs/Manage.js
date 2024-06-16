import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@chakra-ui/react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';

export default function Jobs() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9081/job/all');
                setData(response.data.all); // Assuming 'all' is the array of jobs in your JSON
            } catch (error) {
                console.error('Error fetching job data:', error);
            }
        };

        fetchData();
    }, []);

    const getStatusClassName = (expiryDate) => {
        const currentDate = new Date();
        const expiry = new Date(expiryDate);
        if (expiry < currentDate) {
            return 'Inactive';
        } else {
            return 'Active';
        }
    };

    const statusBodyTemplate = (rowData) => {
        const statusClassName = getStatusClassName(rowData.expiryDate);
        return <div className={`status-cell ${statusClassName}`}>{statusClassName}</div>;
    };

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
            <style>
                {`
                    .status-cell {
                        padding: 8px;
                        border-radius: 5px;
                        text-align: center;
                        font-weight: bold;
                    }

                    .Inactive {
                        background-color: red;
                        color: white;
                    }

                    .Active {
                        background-color: green;
                        color: white;
                    }
                `}
            </style>
            <DataTable value={data} sortField="id" sortOrder={-1} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Job ID" sortable style={{ width: '10%' }} />
                <Column field="jobTitle" header="Job Title" sortable style={{ width: '15%' }} />
                <Column field="description" header="Description" sortable style={{ width: '20%' }} />
                <Column field="qualifications" header="Qualifications" sortable style={{ width: '15%' }} />
                <Column field="skills" header="Skills" sortable style={{ width: '15%' }} />
                <Column field="workExperience" header="Work Experience" sortable style={{ width: '15%' }} />
                <Column field="expiryDate" header="Expiry Date" body={statusBodyTemplate} style={{ width: '10%' }} />
            </DataTable>
        </Box>
    );
}
