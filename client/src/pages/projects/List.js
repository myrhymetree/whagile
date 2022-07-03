import PageTitle from '../../components/items/PageTitle';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetProjectsAPI } from '../../apis/ProjectAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from "react-router-dom"; 

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';

const decoded = decodeJwt(window.localStorage.getItem("access_token"));

function List() {

    const [searchValue, setSearchValue ] = useState('');
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [first2, setFirst2] = useState(0);
    const [rows2, setRows2] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const projects = useSelector(state => state.projectsReducer);
    const [snapshotOrder, setSnapshotOrder] = useState([]);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const navigate = useNavigate();
    const [selectedProduct1, setSelectedProduct1] = useState(null);

    useEffect(
        () => {
            dispatch(callGetProjectsAPI({
                'loginMember': decoded.code,
                'offset': 0,
                'limit': 10,
                'searchValue': searchValue
            }));
        },
        [searchValue]
    );

    const onRowSelect = (event) => {
        // toast.current.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.projects.peojectCode}`, life: 3000 });
        navigate(`/project/${event.data.projectCode}`)
    }

    const onRowUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${event.projects.peojectCode}`, life: 3000 });
    }

    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }

    const onCustomPage2 = (event) => {
        setFirst2(event.first);
        setRows2(event.rows);
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }
    
    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }

    const onChangeHandler = (e) => {

        setSearchValue(e.target.value);

    };

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
                    <InputText type="search" className="p-inputtext-lg block" value={ searchValue } onChange={ onChangeHandler } placeholder="Search" />
                </span>
                <span>
                    <Button label="프로젝트 생성" icon="pi pi-plus" onClick={ () => { navigate(`/projects/regist`) }} />
                </span>
            </div>
            <div>
                <DataTable
                    value={projects} 
                    paginator responsiveLayout="scroll"
                    selectionMode="single"
                    dataKey="projectCode"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                    rows={10}
                    rowsPerPageOptions={[10,20,50]}
                    paginatorLeft={paginatorLeft} 
                    paginatorRight={paginatorRight}
                    selection={selectedProduct1} 
                    onSelectionChange={e => setSelectedProduct1(e.value)}
                    onRowSelect={onRowSelect} onRowUnselect={onRowUnselect}
                >
                    <Column field="projectCode" header="코드" style={{ width: '25%' }} onClick={ () => { navigate(`/project/`+this.value) }  }></Column>
                    <Column field="projectName" header="이름" style={{ width: '25%' }} sortable></Column>
                    <Column field="projectDescription" header="설명" style={{ width: '35%' }}></Column>
                    <Column field="remainedTask" header="내 일감"></Column>
                    <Column field="projectOwner" header="프로젝트 소유자" sortable></Column>
                </DataTable>
            </div>
        </main>
    );
}

export default List;