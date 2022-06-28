import AdminAuthCss from './AdminAuth.module.css';
import '../AdminStyle.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetAuthsAPI, callGetAuthAPI } from '../../../apis/AuthAPICalls';
import { CHANGE_AUTH, INIT_AUTH } from "../../../modules/AuthModule";

import PageTitle from '../../../components/items/PageTitle';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { SelectButton } from 'primereact/selectbutton';
import { InputTextarea } from 'primereact/inputtextarea';

function AdminAuth() {
    
    const [condition, setCondition] = useState(''); // 조건검색 카테고리    
    const [value, setValue] = useState(''); // 조건검색 키워드
    const [dialogShow, setDialogShow] = useState(false); // 모달창 ON/OFF
    const [dialogMode, setDialogMode] = useState('');   // 모달창 권한 생성/수정인지(create, update)
    const options = ['N', 'Y']; // 활성화 여부 선택지
    const toast = useRef(null);
    const dispatch = useDispatch();
    const auths = useSelector(state => state.authsReducer);
    const auth = useSelector(state => state.authReducer);

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

    const onShowCreate = () => {
        dispatch({ 
            type: INIT_AUTH, 
            payload: {}
        });
        setDialogMode('create');
        setDialogShow(true);
    }

    const onShowUpdate = (e) => {
        dispatch(callGetAuthAPI({
            'authorityCode': e.value.authorityCode,
        }));

        setDialogMode('update');
        setDialogShow(true);
    }

    const onHide = () => {
        setDialogShow(false);
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

    const onChangeHandler = (e) => {

        dispatch({ 
            type: CHANGE_AUTH, 
            payload: {
                ...auth,
                [e.target.name]: e.target.value
            }
        });
    }

    return (
        <section className="section">
            {/* title */}
            <PageTitle 
                icon={<i className="pi pi-fw pi-key"></i>}
                text="권한관리"
            />

            {/* search */}
            <div id={AdminAuthCss.search}>
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
                        id={AdminAuthCss.input}
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
            <div id={AdminAuthCss.table}>
                <DataTable 
                    value={auths} 
                    responsiveLayout="scroll"
                    selectionMode="single"
                    onSelectionChange={(e) => onShowUpdate(e)}
                    dataKey="id"
                >
                    <Column field="authorityCode" header="권한 번호" sortable></Column>
                    <Column field="authorityName" header="권한명" sortable></Column>
                    <Column field="authorityDescription" header="권한 설명" sortable></Column>
                    <Column field="authorityExposureOrder" header="노출 순서" sortable></Column>
                    <Column field="authorityActivatedYn" header="활성화 여부" sortable></Column>
                </DataTable>
            </div>
            
            {/* paginator */}
            <div id={AdminAuthCss.paginator}>
                <div>paginator해야됨니다</div>

                <Button 
                    className="p-button-outlined p-button-custom"  
                    label="새 권한 생성"
                    style={{
                        width: '180px', 
                        color: '#FFFFFF', 
                        backgroundColor: '#00AA9C',
                        border: '1px solid #333544'
                    }}
                    onClick={() => onShowCreate()}
                />

                <Dialog 
                    visible={dialogShow} 
                    style={{ width: '40vw', height: '70vh' }} 
                    header={
                        <div id={AdminAuthCss.dialogHeader}>
                            <span>{ (dialogMode==='update')? `권한 수정`: `권한 등록` }</span>
                        </div>
                    }
                    footer={
                        <div id={AdminAuthCss.dialogFooter}>
                            <div>
                                { (dialogMode==='update') &&
                                    <Button
                                        className="p-button-danger" 
                                        label="권한 삭제" 
                                        icon="pi pi-check" 
                                        onClick={() => onHide()} 
                                    />
                                }
                            </div>
                            <div>
                                <Button 
                                    label={(dialogMode==='update')? '수정': '등록'}
                                    icon="pi pi-check" 
                                    onClick={() => onHide()} 
                                    autoFocus 
                                />
                                <Button 
                                    className="p-button-text" 
                                    label="취소" 
                                    icon="pi pi-times" 
                                    onClick={() => onHide()} 
                                />
                            </div>
                        </div>
                    } 
                    onHide={() => onHide()}
                >
                    <div id={AdminAuthCss.dialogBody}>
                        <div>
                            <label>권한명</label>
                            <InputText
                                name="authorityName"
                                value={auth.authorityName}
                                onChange={ onChangeHandler }
                            />
                            {/* <InputText className="p-invalid block"/> */}
                            {/* <small className="p-error block">Username is not available.</small> */}
                        </div>
                        <div>
                            <div>
                                <label>활성화 여부</label>
                                <SelectButton
                                    name="authorityActivatedYn"
                                    value={auth.authorityActivatedYn} 
                                    options={options} 
                                    onChange={ onChangeHandler }
                                />
                            </div>
                            <div>
                                <label>노출 순서</label>
                                <InputText
                                    name="authorityExposureOrder"
                                    value={auth.authorityExposureOrder}
                                    onChange={ onChangeHandler }
                                />
                                {/* <InputText className="p-invalid block"/> */}
                                {/* <small className="p-error block">Username is not available.</small> */}
                            </div>
                        </div>
                        <div>
                            <label>권한 설명</label>
                            <InputTextarea
                                name="authorityDescription"
                                value={auth.authorityDescription} 
                                onChange={ onChangeHandler } 
                                rows={10} 
                                cols={50} 
                                style={{minHeight: '200px'}}
                                autoResize 
                            />
                        </div>
                    </div>
                </Dialog>
            </div>

            {/* toast */}
            <Toast ref={toast} position="top-right" />
            
        </section>
    );
}

export default AdminAuth;