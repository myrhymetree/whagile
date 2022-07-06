import AdminAuthCss from './AdminAuth.module.css';
import '../AdminStyle.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetAuthsAPI, callGetAuthAPI, callGetAuthOrderAPI } from '../../../apis/AuthAPICalls';
import { SET_AUTH, INIT_AUTH, UPDATE_AUTH } from "../../../modules/AuthModule";
import { INSERT_AUTH_ORDER, DELETE_AUTH_ORDER, SET_AUTH_ORDER, SET_AUTH_ORDER_UPDATE } from "../../../modules/AuthOrderModule";

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
import AdminAuthOrder from './AdminAuthOrder';

function AdminAuth() {
    
    const [condition, setCondition] = useState(''); // 조건검색 카테고리    
    const [value, setValue] = useState(''); // 조건검색 키워드
    const [dialogShow, setDialogShow] = useState(false); // 모달창 ON/OFF
    const [dialogMode, setDialogMode] = useState('');   // 모달창 권한 생성/수정인지(insert, update)
    const [orderShow, setOrderShow] = useState(false); // 권한순서 모달창 ON/OFF
    const options = ['N', 'Y']; // 활성화 여부 선택지
    const auths = useSelector(state => state.authsReducer); // api에서 가져온 권한목록(목록을 보여주기 위함)
    const auth = useSelector(state => state.authReducer); // api에서 가져온 단일권한(또는 모달창에 입력된 권한정보)
    const authOrder = useSelector(state => state.authOrderReducer); // api에서 가져온 권한목록(순서 수정을 위함)
    const [snapshotOrder, setSnapshotOrder] = useState([]);
    const dispatch = useDispatch();
    const toast = useRef(null);

    const selectConditions = [
        {label: '권한명', value: 'name'},
        {label: '권한 설명', value: 'description'},
        {label: '활성화 여부', value: 'activated_yn'}
    ];
    
    useEffect(
        () => {
            setCondition('name'); // 검색 조건 초기화

            dispatch(callGetAuthsAPI({ // 권한 관리 목록 
                'offset': 0,
                'limit': 10
            }));

            dispatch(callGetAuthOrderAPI({ // 권한 노출 순서 목록
                'orderCondition': 'exposure_order',
                'orderValue': 'asc'
            }))
        },
        []
    );

    /* 검색 */
    const onClickSearch = () => { // 검색 버튼 클릭

        dispatch(callGetAuthsAPI({
            'offset': 0,
            'limit': 10,
            'searchCondition': condition,
            'searchValue': value
        }));

        toast.current.show({severity: 'success', summary: `검색완료`, detail: value? `${value}을(를) 포함한 검색결과입니다.`: `모든 권한을 조회합니다.`, life: 2400});
    };

    const onKeyPressHandler = e => { // 엔터키 입력

        if(e.key === 'Enter') {
            onClickSearch();
        }
    }

    /* 권한 관리 페이지 */
    const onShowInsert = () => { // 새 권한 생성

        dispatch({ 
            type: INIT_AUTH, 
            payload: {}
        });
        setDialogMode('insert');
        setDialogShow(true);
    }

    const onShowUpdate = (e) => { // 권한 수정(테이블 행 클릭)

        dispatch(callGetAuthAPI({
            'authorityCode': e.value.authorityCode,
        }));

        setDialogMode('update');
        setDialogShow(true);
    }

    /* 권한 등록/수정 모달창(dialogShow) */
    const confirmInsertAuth = () => { // 등록 확인 버튼

        setDialogShow(false);
    }

    const confirmUpdateAuth = () => { // 수정 확인 버튼

        setDialogShow(false);
    }

    const cancelAuth = () => { // 취소 버튼, X 버튼

        setDialogShow(false);
    }

    const onChangeAuth = (e) => { // 모달창 내용 변경 시 작동

        if(e.target.name === 'authorityActivatedYn' && !e.target.value) return;
        // console.log('name', e.target.name)
        // console.log('value', e.target.value)

        let payload = {
            ...auth,
            [e.target.name]: e.target.value
        };

        if(e.target.value === 'N') {
            payload = {
                ...payload,
                authorityExposureOrder: ''
            }
        } 
        //////////////////////////////// 여기가 문제인거 같음
        dispatch({ 
            type: SET_AUTH, 
            payload: payload
        })

        dispatch({
            type: SET_AUTH_ORDER_UPDATE, 
            payload: auth
        })


        if(e.target.name === 'authorityActivatedYn') {
            if(e.target.value === 'Y') {
                if(dialogMode === 'insert') {
                    onShowOrderByInsert();
                }

                if(dialogMode === 'update') {
                    onShowOrderByUpdate();
                }
            }
        }
    }

    /* 권한 순서 변경 모달창 */
    const onShowOrderByInsert = () => { // 새 권한 생성으로 접근 시 노출 순서

        setSnapshotOrder(authOrder);

        if(!auth.authorityCode) { // 새 권한이 권한 순서에 없을 경우 추가
            dispatch({ 
                type: INSERT_AUTH_ORDER,
                payload: auth
            });
        }

        setOrderShow(true);
    }

    const onShowOrderByUpdate = () => { // 권한 수정으로 접근 시 노출 순서
        
        setSnapshotOrder(authOrder);

        setOrderShow(true);
    }

    const confirmOrder = () => { // 권한 순서 변경 확인(실제 저장은 dialog 확인 시)

        // authOrder 변경은 AdminAuthOrder.js에서

        dispatch({ 
            type: UPDATE_AUTH, 
            payload: authOrder
        });

        setOrderShow(false);
    }

    const cancelOrder = () => { // 권한 순서 변경 취소(이전 순서로 되돌리기)

        dispatch({ 
            type: SET_AUTH_ORDER, 
            payload: snapshotOrder
        });

        setOrderShow(false);
    }

    const onTest = () => {
        console.log('authOrder:', authOrder);
        console.log('snapshotOrder:', snapshotOrder);
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
                
                {/* toast */}
                <Toast ref={toast} position="top-right" />   
                
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
                    label="테스트"
                    style={{
                        width: '180px', 
                        color: '#FFFFFF', 
                        backgroundColor: 'coral',
                        border: '1px solid #333544'
                    }}
                    onClick={() => onTest()}
                />
                
                <Button 
                    className="p-button-outlined p-button-custom"  
                    label="새 권한 생성"
                    style={{
                        width: '180px', 
                        color: '#FFFFFF', 
                        backgroundColor: '#00AA9C',
                        border: '1px solid #333544'
                    }}
                    onClick={() => onShowInsert()}
                />

                {/* 권한 등록/수정 모달창 */}
                <Dialog 
                    visible={dialogShow} 
                    style={{ width: '40vw', height: '70vh' }}
                    onHide={() => cancelAuth()}
                    header={
                        <div id={AdminAuthCss.dialogHeader}>
                            <span>
                                { 
                                    (dialogMode==='update')
                                    ? `권한 수정`
                                    : `권한 생성`
                                }
                            </span>
                        </div>
                    }
                    footer={
                        <div id={AdminAuthCss.dialogFooter}>
                            <div>
                                { 
                                    (dialogMode==='update') &&
                                    <Button
                                        className="p-button-danger" 
                                        label="권한 삭제" 
                                        icon="pi pi-check" 
                                        onClick={() => cancelAuth()} 
                                    />
                                }
                            </div>
                            <div>
                                <Button 
                                    label={
                                        (dialogMode==='update')
                                        ? '수정'
                                        : '등록'
                                    }
                                    icon="pi pi-check" 
                                    onClick={
                                        () => {
                                            (dialogMode==='update')
                                            ? confirmUpdateAuth()
                                            : confirmInsertAuth()
                                        }
                                    } 
                                    autoFocus 
                                />
                                <Button 
                                    className="p-button-text" 
                                    label="취소" 
                                    icon="pi pi-times" 
                                    onClick={() => cancelAuth()} 
                                />
                            </div>
                        </div>
                    } 
                >
                    <div id={AdminAuthCss.dialogBody}>
                        <div>
                            <label>권한명</label>
                            <InputText
                                name="authorityName"
                                value={auth.authorityName || ''}
                                onChange={ onChangeAuth }
                                placeholder="필수 입력 사항입니다."
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
                                    onChange={ onChangeAuth }
                                />
                            </div>
                            <div>
                                <label>노출 순서</label>
                                <InputText
                                    name="authorityExposureOrder"
                                    value={auth.authorityExposureOrder || ''}
                                    placeholder="활성화 시 필수 입력 사항입니다."
                                    onChange={ onChangeAuth }
                                    onClick={ (auth.authorityActivatedYn === 'Y')
                                                ? ((dialogMode==='update')? onShowOrderByUpdate: onShowOrderByInsert)
                                                : null
                                            }
                                    tooltip={ (auth.authorityActivatedYn === 'Y')
                                        ? null
                                        : '활성화시켰을 경우 설정이 가능합니다.'
                                    }
                                    readOnly
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
                                onChange={ onChangeAuth } 
                                rows={10} 
                                cols={50} 
                                style={{minHeight: '200px'}}
                                autoResize 
                            />
                        </div>
                    </div>
                </Dialog>
                
                {/* 권한 순서 수정 모달창 */}
                <Dialog 
                    visible={orderShow} 
                    style={{ width: '30vw', height: '60vh' }}
                    onHide={cancelOrder}
                    header={ 
                        <h4>권한 순서 편집</h4>
                    }
                    footer={
                        <div style={{marginTop: '20px'}}>
                            <Button 
                                label="설정"
                                icon="pi pi-check"
                                onClick={confirmOrder}
                                autoFocus 
                            />
                            <Button 
                                label="취소" 
                                icon="pi pi-times" 
                                onClick={cancelOrder}
                                className="p-button-text"
                            />
                        </div>
                    }
                >
                    <div style={{width: '100%', height: '100%'}}>
                        본문
                    </div>
                </Dialog>

            </div>
            
        </section>
    );
}

export default AdminAuth;