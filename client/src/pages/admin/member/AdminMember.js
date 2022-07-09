import PageTitle from '../../../components/items/PageTitle';
import AdminMemberCSS from './AdminMember.module.css';
import '../AdminStyle.css';

import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

function AdminMember() {


    const [products, setProducts] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [memberDetail, setMemberDetail] = useState({});
    const [memberDetailShow, setMemberDetailShow] = useState(false); // 상세보기 모달창 ON/OFF


    const [condition, setCondition] = useState(''); // 조건검색 카테고리    
    const [value, setValue] = useState(''); // 조건검색 키워드

    const selectConditions = [
        {label: '아이디 검색', value: 'memberId'},
        {label: '이름 검색', value: 'name'}
    ];

    /* 검색 */
    const onClickSearch = () => { // 검색 버튼 클릭
        
        toast.current.show({severity: 'success', summary: `검색완료`, detail: value? `${value}을(를) 포함한 검색결과입니다.`: `모든 권한을 조회합니다.`, life: 2400});
    };

    const onKeyPressHandler = e => { // 엔터키 입력

        if(e.key === 'Enter') {
            onClickSearch();
        }
    }

    const toast = useRef(null);
    const showError = (msg) => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:msg, life: 3000});
    }

    useEffect(() => {

        fetch(`http://localhost:8888/api/account/members`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access_token": window.localStorage.getItem("access_token")
            }
        })
        .then(response => response.json())
        .then(json => {
            setProducts(json.results);
        })
        .catch((err) => {
            showError('회원 목록 조회 실패하였습니다.');
        });

        
    }, 
    []); // eslint-disable-line react-hooks/exhaustive-deps

    const onCustomPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    }

    const formatCurrency = (value) => {
        //return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        return value.toLocaleString('ko-KR', { timeZone: 'UTC' });
    }

    const onClickMemberDetailHandler = (memberCode) => {
        console.log(memberCode);

        fetch(`http://localhost:8888/api/account/member?code=${memberCode}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Access_token": window.localStorage.getItem("access_token")
            }
        })
        .then(response => response.json())
        .then(json => {
            console.log(json.results[0]);
            const result = json.results[0];
            setMemberDetail(result);  

            setMemberDetailShow(true);
        })
        .catch((err) => {
            showError('내 정보 불러오기를 실패하였습니다.');
        });

    }

    const actionBodyTemplate = (rowData) => {
        const memberCode = rowData.memberCode;
        return (
        <div style={ { width: '100%', display: 'flex', justifyContent: 'space-around'}}>
            <Button 
                type="button" 
                icon="pi pi-search" 
                onClick={ () => onClickMemberDetailHandler(memberCode) }
            />
            <Button type="button" icon="pi pi-history" value={ rowData.memberCode }></Button>
            <Button type="button" icon="pi pi-dollar" value={ rowData.memberCode }></Button>
        </div>
        );
    }

    const template = {
        layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 }
            ];

            return (
                <>
                    <span className="mx-1" style={{ color: 'var(--text-color)', userSelect: 'none' }}>페이지당 : </span>
                    <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
                </>
            );
        },
        'CurrentPageReport': (options) => {
            return (
                <span style={{ color: 'var(--text-color)', userSelect: 'none', width: '120px', textAlign: 'center' }}>
                    {options.first} - {options.last} of {options.totalRecords}
                </span>
            )
        }
    };


    const dismissDetail = () => { // 권한 순서 변경 확인(실제 저장은 dialog 확인 시)

        
        setMemberDetailShow(false);
    }

    const onClickTempPwdHandler = () => {
        
        console.log('임시비밀번호발급');
    }

    return (
        <section className="section">
            
            {/* title */}
            <PageTitle 
                icon={<i className="pi pi-fw pi-user"></i>}
                text="회원관리"
            />

            {/* search */}
            <div id={AdminMemberCSS.search}>

                <span>검색</span>
                <div>
                    <Dropdown 
                        value={condition} 
                        options={selectConditions} 
                        onChange={(e) => setCondition(e.value)} 
                        placeholder="검색 대상"
                    />
                </div>

                <span className="p-input">
                    <InputText 
                        id={AdminMemberCSS.input}
                        value={value} 
                        onChange={(e) => setValue(e.target.value)}
                        onKeyPress={ onKeyPressHandler }
                    />
                </span>
                <Button 
                    icon="pi pi-search" 
                    className="p-button-outlined p-button-custom"  
                    aria-label="Search"
                    onClick={ onClickSearch }
                    style={{
                        width: '80px', 
                        color: '#FFFFFF', 
                        backgroundColor: '#1D1E27', 
                        border: '1px solid #333544'
                    }}
                />
                
            </div>

            {/* 권한 순서 수정 모달창 */}
            <Dialog 
                    visible={ memberDetailShow } 
                    style={{ width: '30vw', height: '75vh' }}
                    onHide={dismissDetail}
                    header={ 
                        <h4>회원 정보 상세 조회</h4>
                    }
                    footer={
                        <div style={{marginTop: '20px'}}>
                            <Button 
                                label="확인"
                                icon="pi pi-check"
                                onClick={dismissDetail}
                                autoFocus 
                            />
                        </div>
                    }
                >
                    <div style={{width: '100%', height: '100%'}}>
                    <table id={AdminMemberCSS.vertical}>                        
                        <tbody>
                            <tr>
                                <th>회원 아이디</th>
                                <td>{memberDetail.memberId || '없음' }</td>
                            </tr>
                            <tr>
                                <th >회원 이메일</th>
                                <td>{memberDetail.email || '없음' }</td>
                            </tr>
                            <tr>
                                <th >회원 이름</th>
                                <td>{memberDetail.name || '없음' }</td>
                            </tr>
                            <tr>
                                <th >비밀번호</th>
                                <td>
                                    <Button 
                                        id={AdminMemberCSS.pwdBtn} 
                                        className="p-button-rounded p-button-danger p-button-sm"
                                        onClick={ onClickTempPwdHandler}
                                    >
                                        임시 비밀번호 발급
                                    </Button>
                                </td>
                            </tr>
                            <tr>
                                <th >전화번호</th>
                                <td>{memberDetail.phone || '없음' }</td>
                            </tr>
                            <tr>
                                <th >회사명</th>
                                <td>{memberDetail.company || '없음' }</td>
                            </tr>
                            <tr>
                                <th >가입 목적</th>
                                <td>{memberDetail.purpose || '없음' }</td>
                            </tr>
                            <tr>
                                <th >가입일</th>
                                <td>{memberDetail.createDate || '없음' }</td>
                            </tr>
                            <tr>
                                <th >사용중인 요금제</th>
                                <td>'요금제'</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
            </Dialog>




            {/* table */}
            <div className="card">
                <Toast ref={toast} position="top-center" />
                <DataTable value={products} 
                    paginator 
                    paginatorTemplate={template} 
                    first={first} 
                    rows={rows} 
                    onPage={onCustomPage}
                    paginatorClassName="justify-content-end" 
                    className="mt-6"  
                    sortMode="multiple" 
                    responsiveLayout="scroll"
                >
                    <Column field="memberId" header="아이디" sortable></Column>
                    <Column field="name" header="이름" sortable></Column>
                    <Column field="email" header="이메일주소" sortable></Column>
                    <Column field="createDate" header="가입일" sortable></Column>
                    {/* <Column field="price" header="Price" body={priceBodyTemplate} sortable></Column> */}
                    <Column 
                        headerStyle={{ width: '2 rem', textAlign: 'center' }} 
                        bodyStyle={{ textAlign: 'center', overflow: 'visible' }} 
                        body={actionBodyTemplate} 
                    />
                </DataTable>

            </div>
        </section>
    );
}

export default AdminMember;