import AdminAuthCss from './AdminAuth.module.css';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function AdminAuth() {

    const [condition, setCondition] = useState('');
    const [value, setValue] = useState('');

    const selectConditions = [
        {label: '권한 이름', value: 'name'},
        {label: '생성자', value: 'creater'}
    ];

    // table
    const products = [
        {code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24},
        {code: 'g230fh0g3', name: 'Iamboo Watch', category: 'Accessories', quantity: 25},
        {code: 'h230fh0g3', name: 'Hamboo Watch', category: 'Accessories', quantity: 26},
        {code: 'i230fh0g3', name: 'Gamboo Watch', category: 'Accessories', quantity: 23},
        {code: 'f230fh0g3', name: 'Famboo Watch', category: 'Accessories', quantity: 23},
        {code: 'f230fh0g3', name: 'Eamboo Watch', category: 'Accessories', quantity: 24},
        {code: 'f230fh0g3', name: 'Damboo Watch', category: 'Accessories', quantity: 22},
        {code: 'f230fh0g3', name: 'Camboo Watch', category: 'Accessories', quantity: 24},
        {code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories', quantity: 24},
        {code: 'f230fh0g3', name: 'Aamboo Watch', category: 'Accessories', quantity: 24},
    ];
    
    useEffect(
        () => {
            setCondition('name');
        },
        []
    );

    return (
        <section>
            {/* title */}
            <div id={ AdminAuthCss.title }>
                <i className="pi pi-fw pi-key"></i>
                <span>권한관리</span>
            </div>

            {/* search */}
            <div id={ AdminAuthCss.search }>
                <span>검색</span>
                <div>
                    <Dropdown 
                        value={condition} 
                        options={selectConditions} 
                        onChange={(e) => setCondition(e.value)} 
                        placeholder="검색 대상"
                    />
                </div>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={value} onChange={(e) => setValue(e.target.value)} />
                </span>
            </div>

            {/* table */}
            <div id={ AdminAuthCss.table }>
                <DataTable value={products} responsiveLayout="scroll">
                    <Column field="code" header="Code" sortable></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="category" header="Category" sortable></Column>
                    <Column field="quantity" header="Quantity" sortable></Column>
                </DataTable>
            </div>
        </section>
    );
}

export default AdminAuth;