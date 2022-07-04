import { 
      callGetAuthsAPI
    , callGetAuthAPI
    , callGetAuthOrderAPI
    , callPostAuthAPI
    , callPutAuthAPI
    , callDeleteAuthAPI
    , callPutAuthOrderAPI
} from '../../../apis/AuthAPICalls';
import AdminAuthCss from './AdminAuth.module.css';
import '../AdminStyle.css';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SET_AUTH, INIT_AUTH, UPDATE_AUTH } from "../../../modules/AuthModule";
import authOrderReducer, { INSERT_AUTH_ORDER, DELETE_AUTH_ORDER, SET_AUTH_ORDER, SET_AUTH_ORDER_UPDATE } from "../../../modules/AuthOrderModule";

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
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';

import AdminAuthOrder from './AdminAuthOrder';

function AdminAuth() {
    
    const [condition, setCondition] = useState(''); // 조건검색 카테고리    
    const [value, setValue] = useState(''); // 조건검색 키워드
    const [dialogShow, setDialogShow] = useState(false); // 모달창 ON/OFF
    const [dialogMode, setDialogMode] = useState('');   // 모달창 권한 생성/수정인지(insert, update)
    const [orderShow, setOrderShow] = useState(false); // 권한순서 모달창 ON/OFF
    const activatedOptions = ['N', 'Y']; // 활성화 여부 선택지
    const [alertVisible, setAlertVisible] = useState(false); // 권한삭제 alert창 ON/OFF
    const auths = useSelector(state => state.authsReducer); // api에서 가져온 권한목록(목록을 보여주기 위함)
    const auth = useSelector(state => state.authReducer); // api에서 가져온 단일권한(또는 모달창에 입력된 권한정보)
    const authOrder = useSelector(state => state.authOrderReducer); // api에서 가져온 권한목록(순서 수정을 위함)
    const [snapshotAuth, setSnapshotAuth] = useState([]);
    const [snapshotOrder, setSnapshotOrder] = useState([]);
    const dispatch = useDispatch();
    const toast = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const [first1, setFirst1] = useState(0);

    const selectConditions = [
        {label: '권한명', value: 'name'},
        {label: '권한 설명', value: 'description'},
        {label: '활성화 여부', value: 'activated_yn'}
    ];
    
    useEffect(
        () => {
            setCondition('name'); // 검색 조건 초기화

            dispatch(callGetAuthsAPI()); // 권한 관리 목록 API 호출

            dispatch(callGetAuthOrderAPI()); // 권한 노출 순서 목록 API 호출
        },
        []
    );

    /* 검색 */
    const onClickSearch = () => { // 검색 버튼 클릭

        dispatch(callGetAuthsAPI({
            'offset': 0,
            'limit': 30,
            'searchCondition': condition,
            'searchValue': value,
            'orderCondition': 'code',
            'orderValue': 'desc'
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

        setSnapshotOrder(authOrder);

        dispatch({ 
            type: INIT_AUTH, 
            payload: {}
        });

        setDialogMode('insert');

        setDialogShow(true);
    }

    const onShowUpdate = (e) => { // 권한 수정(테이블 행 클릭)

        setSnapshotOrder(authOrder);

        dispatch(callGetAuthAPI({
            'authorityCode': e.value.authorityCode,
        }));

        setDialogMode('update');
        
        setDialogShow(true);
    }

    const cancelAuth = () => { // 취소 버튼, X 버튼

        dispatch({ 
            type: SET_AUTH_ORDER, 
            payload: snapshotOrder
        });

        setDialogShow(false);
    }

    /* 권한 등록/수정 모달창(dialogShow) */
    const confirmInsertAuth = () => { // 등록 확인 버튼
        
        dispatch(callPostAuthAPI(auth, authOrder));
        
        setSnapshotAuth({});
        setSnapshotOrder([]);

        setDialogShow(false);

        toast.current.show({severity: 'success', summary: `새 권한 생성 완료`, detail: `새 권한 '${auth.authorityName}'이(가) 생성되었습니다.`, life: 2400});
    }

    const confirmUpdateAuth = () => { // 수정 확인 버튼

        dispatch(callPutAuthAPI(auth, authOrder));

        setSnapshotAuth({});
        setSnapshotOrder([]);

        setDialogShow(false);

        toast.current.show({severity: 'success', summary: `권한 수정 완료`, detail: `'${auth.authorityName}'이(가) 수정되었습니다.`, life: 2400});
    }

    const confirmDeleteAuth = () => { // 삭제 확인 버튼(alert창)
        
        dispatch(callDeleteAuthAPI(auth, authOrder));

        setSnapshotAuth({});
        setSnapshotOrder([]);

        setDialogShow(false);

        toast.current.show({severity: 'success', summary: `권한 삭제 완료`, detail: `'${auth.authorityName}'이(가) 삭제되었습니다.`, life: 2400});
    }

    const onChangeAuth = async (e) => { // 모달창 내용 변경시 감지

        let paramAuth = {
            ...auth,
            [e.target.name]: e.target.value
        };
        
        if(e.target.value === 'N') { // 활성화 여부를 Y에서 N으로 바꿨을 때 authorityExposureOrder를 비워주는 작업
            paramAuth = {
                ...paramAuth,
                authorityExposureOrder: ''
            }
        } 
        
        dispatch({ 
            type: SET_AUTH, 
            payload: paramAuth
        })
        
        dispatch({
            type: SET_AUTH_ORDER_UPDATE, 
            payload: paramAuth
        })

        if(e.target.name === 'authorityActivatedYn') {
            if(e.target.value === 'Y') {
                // setSnapshotAuth(auth);
                onShowOrder('button');
            }
        }
    }

    const onShowOrder = (path) => { // 노출 순서 모달
        
        setSnapshotAuth(auth);
        setSnapshotOrder(authOrder);

        if(path === 'button') { // Y버튼으로 접근 시에만 권한 순서에 추가
            dispatch({ 
                type: INSERT_AUTH_ORDER,
                payload: auth
            });
        }

        setOrderShow(true);
    }

    const confirmOrder = () => { // 권한 순서 변경 확인(실제 저장은 dialog 확인 시)

        // authOrder 변경은 AdminAuthOrder.js에서 함

        dispatch({ 
            type: UPDATE_AUTH, 
            payload: authOrder
        });

        setOrderShow(false);
    }

    const cancelOrder = () => { // 권한 순서 변경 취소

        dispatch({ // N에서 Y로 들어왔을 때, 취소 버튼 시 N으로 되돌림
            type: SET_AUTH,
            payload: snapshotAuth
        });

        dispatch({ // 이전 순서로 되돌림
            type: SET_AUTH_ORDER, 
            payload: snapshotOrder
        });

        setOrderShow(false);
    }

    const activatedStyle = (rowData) => { // 활성화 여부 chip CSS

        return (
            <div className={
                    (rowData.authorityActivatedYn === 'Y')
                    ? AdminAuthCss.activatedY
                    : AdminAuthCss.activatedN
                } 
            >
                { 
                    (rowData.authorityActivatedYn === 'Y')
                    ? '사용 중'
                    : '미사용'
                }
            </div>
        );
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
                    paginator
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                    rows={10} 
                    paginatorRight={                
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
                    }
                >
                    <Column field="authorityCode" header="권한 번호" sortable></Column>
                    <Column field="authorityName" header="권한명" sortable></Column>
                    <Column field="authorityDescription" header="권한 설명" sortable></Column>
                    <Column field="authorityExposureOrder" header="노출 순서" sortable></Column>
                    <Column field="authorityActivatedYn" header="활성화 여부" body={activatedStyle} sortable></Column>
                </DataTable>
            </div>
            
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
                                    onClick={() => setAlertVisible(true)} 
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
                            onChange={(e) => onChangeAuth(e)}
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
                                options={activatedOptions} 
                                onChange={(e) => onChangeAuth(e)}
                            />
                        </div>
                        <div>
                            <label>노출 순서</label>
                            <InputText
                                name="authorityExposureOrder"
                                value={auth.authorityExposureOrder || ''}
                                placeholder="활성화 시 필수 입력 사항입니다."
                                onChange={(e) => onChangeAuth(e)}
                                onClick={ (auth.authorityActivatedYn === 'Y')
                                            ? () => onShowOrder('input')
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
                            onChange={(e) => onChangeAuth(e)}
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
                    <AdminAuthOrder 
                        selectedCode={auth.authorityCode}
                    />
                </div>
            </Dialog>
            
            {/* 권한 삭제 alert창 */}
            <ConfirmDialog 
                visible={ alertVisible } 
                onHide={() => setAlertVisible(false)} 
                header="권한 삭제" 
                message={<span>권한 삭제 시 사이트에 영향을 줄 수 있습니다. <br/>해당 권한을 삭제하시겠습니까?</span>}
                icon="pi pi-exclamation-triangle"
                style={{width: '20vw'}}
                accept={() => confirmDeleteAuth()} 
                reject={() => setAlertVisible(false)} 
            />
            
            {/* 테스트창 auth/authorder/snapshotAuth/snapshotOrder */}
            {/* <div style={{display: 'flex', flexDirection: 'row'}}>
                <div
                    style={{width: '20vw', height: '200px', backgroundColor: 'coral', padding: '10px', color: 'black'}}
                >
                    <ul>
                        <li>{auth.authorityCode}</li>
                        <li>{auth.authorityName}</li>
                        <li>{auth.authorityExposureOrder}</li>
                        <li>{auth.authorityActivatedYn}</li>
                        <li>{auth.authorityDescription}</li>
                    </ul>
            
                </div>
                <div 
                    style={{width: '20vw', height: '200px', backgroundColor: 'lightgreen', padding: '10px', color: 'black'}}
                >
                    <ul>
                        {authOrder.map((item, index) => <li key={index}>{item.authorityCode}</li>)}
                    </ul>
                </div>
                <div 
                    style={{width: '20vw', height: '200px', backgroundColor: 'lightyellow', padding: '10px', color: 'black'}}
                >
                    <ul>
                        <li>{snapshotAuth.authorityCode}</li>
                        <li>{snapshotAuth.authorityName}</li>
                        <li>{snapshotAuth.authorityExposureOrder}</li>
                        <li>{snapshotAuth.authorityActivatedYn}</li>
                        <li>{snapshotAuth.authorityDescription}</li>
                    </ul>
                </div>
                <div 
                    style={{width: '20vw', height: '200px', backgroundColor: 'skyblue', padding: '10px', color: 'black'}}
                >
                    <ul>
                        {snapshotOrder.map((item, index) => <li key={index}>{item.authorityCode}</li>)}
                    </ul>
                </div>
            </div> */}
        </section>
    );
}

export default AdminAuth;