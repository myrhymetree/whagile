import PageTitle from '../../../components/items/PageTitle';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetProjectMemberAPI } from '../../../apis/ProjectAPICalls';
import { callDeleteProjectMemberAPI } from '../../../apis/ProjectAPICalls';
import { useParams } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Row } from 'primereact/row';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

function TeamMateList() {

    let emptyMember = {
        memberCode: null,
        memberId: null,
        memberName: null,
        memberEmail: null,
        authorityName: null
    };

    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const toast = useRef(null);
    const memberList = useSelector(state => state.projectMemberReducer);
    const [currentPage, setCurrentPage] = useState(1);
    const [members, setMembers] = useState(null);
    const [selectedMember, setSelectedMember] = useState(null);
    const [deleteMemberDialog, setDeleteMemberDialog] = useState(false);
    const [ member, setMember ] = useState(emptyMember);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [memberDialog, setMemberDialog] = useState(false);
    

    // useEffect(
    //     () => {
    //         dispatch(callGetProjectsAPI({
    //             'loginMember': (decoded !== 'undefined')? decoded.code: '',
    //             'searchValue': searchValue
    //         }));
    //     },
    //     [searchValue]
    // );

    useEffect(
        () => {
            dispatch(callGetProjectMemberAPI({
                'projectCode': projectCode
            }));
        },
        []
    );

    // useEffect(
    //     () => {
    //         setMembers(memberList);
    //     },
    //     [memberList]
    // );

    function removeMember(rowData) {
        dispatch(callDeleteProjectMemberAPI({
            'projectCode': projectCode,
            'memberCode': rowData.memberCode
        }));
    }

    const openNew = () => {
        setMember(emptyMember);
        setSubmitted(false);
        setMemberDialog(true);
    }

    const hideDeleteMemberDialog = () => {
        setDeleteMemberDialog(false);
    }

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
    const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

    // function statusBodyTemplate(data) {
    //     return ((memberList.length !== 0)? (memberList.map((data) => {return data.authorityName}) !== 'PM'): true) && <Button icon="pi pi-trash" onClick={() => { removeMember(data) }} />;
    //     // return <Button icon="pi pi-search" />;
    // }

    const deleteMember = () => {
        // let _members = members.filter(val => val.memberCode !== member.memberCode);
        // setMembers(_members);
        setDeleteMemberDialog(false);
        // setMember(emptyMember);
        removeMember(member);
        toast.current.show({ severity: 'success', summary: '팀원 제외', detail: '해당 팀원을 제외했습니다.', life: 3000 });
    }
    
    const deleteMemberDialogFooter = (
        <>
            <Button label="확인" icon="pi pi-check" className="p-button-text" onClick={deleteMember} />
            <Button label="취소" icon="pi pi-times" className="p-button-text" onClick={hideDeleteMemberDialog} />
        </>
    );


    const confirmDeleteProjectMember = (rowData) => {
        console.log(rowData);

        if(rowData.authorityName === 'PM') {
            return toast.current.show({ severity: 'error', summary: '제거 불가', detail: 'PM은 제거할 수 없습니다.', life: 3000 });
        }
        
        setMember(rowData);
        setDeleteMemberDialog(true);
        // removeMember(rowData);
    }

    const actionBodyTemplate = (rowData) => {
        // console.log(rowData);
        return (
            <>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProjectMember(rowData)} />
            </>
        );
    }

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <>
                <Button label="팀원 초대" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew}/>
                {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </>
        )
    }

    return (
        <>  
            <PageTitle 
                icon={<i className="pi pi-fw pi-users"></i>}
                text="프로젝트 팀원목록"
            />

            <Toast ref={toast} />
            <div className="card" style={{ width: 70 + '%' }}>
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>

                <DataTable
                    globalFilter={globalFilter}
                    value={memberList} 
                    paginator responsiveLayout="scroll"
                    // selectionMode="single"
                    // rowHover={true}
                    // showGridlines={true}
                    // cellSelection={true}
                    selection={selectedMember} 
                    dataKey="memberCode"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
                    rows={10}
                    rowsPerPageOptions={[10,20,50]}
                    paginatorLeft={paginatorLeft}
                    paginatorRight={paginatorRight}
                    onSelectionChange={e => setSelectedMember(e.value)}
                    header={header}
                    // onCellUnselect={onRowUnselect}
                    // footer={footer}
                    // headerColumnGroup={headerGroup}
                >
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column> */}
                    <Column field="memberCode" header="번호" hidden ></Column>
                    <Column field="memberId" header="아이디" style={{ width: '25%' }} align="center" sortable></Column>
                    <Column field="memberName" header="이름" style={{ width: '15%' }} align="center" sortable></Column>
                    <Column field="memberEmail" header="이메일" align="center" sortable></Column>
                    <Column field="authorityName" header="권한" align="center" sortable filter></Column>
                    <Column columnKey="memberCode" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={deleteMemberDialog} style={{ width: '450px' }} header="팀원 제외" modal footer={deleteMemberDialogFooter} onHide={hideDeleteMemberDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {member && <span><b>      {member.memberName}</b> 팀원을 제외하시겠습니까?</span>}
                </div>
            </Dialog>

            {/* <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
            </Dialog> */}
        </>
    );
}

export default TeamMateList;