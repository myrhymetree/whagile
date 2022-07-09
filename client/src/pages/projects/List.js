import PageTitle from '../../components/items/PageTitle';
import MainHeader from '../../components/commons/MainHeader';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetProjectsAPI } from '../../apis/ProjectAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import { useNavigate } from "react-router-dom"; 

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';

function List() {

    let emptyProject = {
        projectCode: null,
        projectCompletedTask: null,
        projectDeletedStatus: null,
        projectDescription: null,
        projectName: null,
        projectOwner: null,
        projectTotalTask: null,
        remainedTask: null
    };
    
    const decoded = decodeJwt(window.localStorage.getItem("access_token"));
    const [ searchValue, setSearchValue ] = useState('');
    const [ project, setProject ] = useState(emptyProject);
    const projects = useSelector(state => state.projectsReducer);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const navigate = useNavigate();
    const [selectedProject, setSelectedProject] = useState(null);
    const op = useRef(null);

    useEffect(
        () => {

            console.log();

            dispatch(callGetProjectsAPI({
                 
                'loginMember': (decoded !== 'undefined')? decoded.code: '',
                'searchValue': searchValue
        }));


        },
        []
    );

    useEffect(
        () => {
            dispatch(callGetProjectsAPI({
                 
                    'loginMember': (decoded !== 'undefined')? decoded.code: '',
                    'searchValue': searchValue

            }));
        },
        [searchValue]
    );

    const onRowSelect = (event) => {
        // toast.current.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${event.projects.peojectCode}`, life: 3000 });
        navigate(`/project/${event.data.projectCode}/dashboard`);
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;
    
    const onChangeHandler = (e) => {

        setSearchValue(e.target.value);

    };

    const actionChoiceHandler = (rowData) => {
        console.log(rowData); 
        // setProject(rowData);
        // console.log(project);
        // navigate(`/project/${ project.projectCode }/management/information`)
    }

    const statusBodyTemplate = (rowData) => {
        // console.log(rowData);
        // return <span className={`pi pi-ellipsis-h`}></span>;
        return (
            <>
                <Button
                    type="button" 
                    icon="pi pi-ellipsis-h"
                    onClick={(e) => op.current.toggle(e)}  
                />
                <OverlayPanel ref={op} id="overlay_panel" style={{width: '200px'}} className="overlaypanel">              
                    <Button label="프로젝트 수정" className="p-button-text p-button-plain" icon="pi pi-pencil" onClick={ () => { actionChoiceHandler(rowData)}} />               
                    <Button label="프로젝트 삭제" className="p-button-text p-button-plain" icon="pi pi-trash"/>             
                </OverlayPanel>
            </>
        );
    }

    const footer = `총  ${projects ? projects.length : 0}개의 프로젝트가 있습니다.`;

    return (
        <>
            <MainHeader/>
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
                    <div className="card">
                        <DataTable
                            value={projects} 
                            paginator responsiveLayout="scroll"
                            selectionMode="single"
                            selection={selectedProject} 
                            dataKey="projectCode"
                            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                            rows={10}
                            rowsPerPageOptions={[10,20,50]}
                            paginatorLeft={paginatorLeft} 
                            paginatorRight={paginatorRight}
                            onSelectionChange={e => setSelectedProject(e.value)}
                            onRowSelect={onRowSelect}
                            footer={footer}
                        >
                            <Column field="projectCode" header="번호" hidden ></Column>
                            <Column field="projectName" header="이름" style={{ width: '25%' }} sortable></Column>
                            <Column field="projectDescription" header="설명" style={{ width: '35%' }}></Column>
                            <Column field="remainedTask" header="내 일감"></Column>
                            <Column field="projectOwner" header="프로젝트 소유자" sortable></Column>
                            <Column columnKey="projectCode" body={statusBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                        </DataTable>
                    </div>
                </div>
            </main>
        </>
    );
}

export default List;