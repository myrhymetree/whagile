import AdminAuthCss from './AdminAuth.module.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetAuthsAPI } from '../../../apis/AuthAPICalls';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import PageTitle from '../../../components/items/PageTitle';

function AdminAuth() {

    const [condition, setCondition] = useState('');
    const [value, setValue] = useState('');
    const products = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const toast = useRef(null);

    const selectConditions = [
        {label: '권한명', value: 'name'},
        {label: '권한 설명', value: 'description'},
        {label: '활성화 여부', value: 'activated_yn'}
    ];
    
    const onClickSearch = () => {
        dispatch(callGetAuthsAPI({
            'offset': 0,
            'limit': 10,
            'searchCondition': condition,
            'searchValue': value
        }));

        toast.current.show({severity: 'success', summary: `검색완료`, detail: value? `${value}을(를) 포함한 검색결과입니다.`: `모든 권한을 조회합니다.`, life: 2400});
    };

    const onKeyPressHandler = e => {
        if(e.key === 'Enter') {
            onClickSearch();
        }
    }

    useEffect(
        () => {
            setCondition('name');
            dispatch(callGetAuthsAPI({
                'offset': 0,
                'limit': 10
            }));
        },
        []
    );

    return (
        <section>
            {/* title */}
            <PageTitle 
                icon={<i className="pi pi-fw pi-key"></i>}
                text="권한관리"
            />

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

                <span className="p-input">
                    <InputText 
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

            {/* table */}
            <div id={ AdminAuthCss.table }>
                <DataTable value={products} responsiveLayout="scroll">
                    <Column field="authorityCode" header="권한 번호" sortable></Column>
                    <Column field="authorityName" header="권한명" sortable></Column>
                    <Column field="authorityDescription" header="권한 설명" sortable></Column>
                    <Column field="authorityExposureOrder" header="노출 순서" sortable></Column>
                    <Column field="authorityActivatedYn" header="활성화 여부" sortable></Column>
                </DataTable>
            </div>
            
            {/* paginator */}
            <div id={ AdminAuthCss.paginator }>
                <div>paginator해야됨니다</div>

                <Button 
                    className="p-button-outlined p-button-custom"  
                    label="권한 생성"
                    style={{
                        width: '180px', 
                        color: '#FFFFFF', 
                        backgroundColor: '#00AA9C',
                        border: '1px solid #333544'
                    }}
                />
            </div>

            {/* toast */}
            <Toast ref={toast} position="top-right" />
            
        </section>
    );
}

export default AdminAuth;