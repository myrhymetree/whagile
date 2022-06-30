import PageTitle from '../../components/items/PageTitle';
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

function List() {

    const [searchValue, setSearchValue ] = useState('');
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [first2, setFirst2] = useState(0);
    const [rows2, setRows2] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');

    return (
        <main>
            <section>
                <PageTitle 
                    icon={ <i className="pi pi-fw pi-inbox"></i>}
                    text="프로젝트 목록"
                />
            </section>
            <div>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" className="p-inputtext-lg block" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Search" />
                </span>
                <span>
                    <Button label="프로젝트 생성" icon="pi pi-plus" />
                </span>
            </div>
            <div>
                <DataTable  responsiveLayout="scroll">
                    <Column field="code" header="이름" sortable></Column>
                    <Column field="name" header="설명" sortable></Column>
                    <Column field="category" header="내 일감" sortable></Column>
                    <Column field="quantity" header="프로젝트 소유자" sortable></Column>
                </DataTable>
            </div>
        </main>
    );
}

export default List;