import InquiryCSS from './Inquiry.module.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { callPutInquiryAPI, callDeleteInquiryAPI } from '../../apis/InquiryAPICalls';

import { Dialog } from 'primereact/dialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

function InquiryDetailModal({ inquiry }) {

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    /* 1:1 문의 등록 데이터 임시 저장용 state */
    const [title, setTitle] = useState(inquiry.title);
    const [content, setContent] = useState(inquiry.content);
    const [categoryCode, setCategoryCode] = useState(inquiry.categoryCode);

    /* 문의 삭제 확인 confirm dialog state */
    const [visibleConfirmDelete, setVisibleConfirmDelete ] = useState(false);

    /* 문의 유형 */
    const categories = [
        { label: '일반', value: 1 },
        { label: '버그 신고', value: 2 },
        { label: '결제 및 환불', value: 3 },
        { label: '건의 사항', value: 4 },
    ];

    /* 문의 수정 요청 */
    const editInquiry = async () => {
        if (inquiry.answeredYN === 'Y') {
            alert('답변이 완료된 문의글은 수정할 수 없습니다.');
        } else if (
            title === inquiry.title &&
            content === inquiry.content &&
            categoryCode === inquiry.categoryCode
        ) {
            alert('변경된 내용이 없습니다.');
        } else {
            const modifiedInquiry = {
                inquiryCode: inquiry.inquiryCode,
                title: (title === inquiry.title)? null : title,
                content: (content === inquiry.content)? null : content,
                categoryCode: (categoryCode === inquiry.categoryCode)? null : categoryCode
            }

            await dispatch(callPutInquiryAPI(modifiedInquiry));
            await window.location.replace(window.location.href);
        }
    };

    /* 문의 삭제 요청 */
    const removeInquiry = () => {
        if (inquiry.answeredYN === 'Y') {
            alert('답변이 완료된 문의글은 삭제할 수 없습니다.');
        } else {
            setVisibleConfirmDelete(true);
        }
    };
    
    const accept = async () => {
        await dispatch(callDeleteInquiryAPI(inquiry.inquiryCode));
        await onHide();
        await window.location.replace(window.location.href);
    }

    const reject = async () => { setVisibleConfirmDelete(false) }

    /* 다이얼로그 닫기 */
    const onHide = () => { 
        setVisible(false);
        /* 임시저장 데이터 초기화 */
        setTitle(inquiry.title);
        setContent(inquiry.content);
        setCategoryCode(inquiry.categoryCode);
    }

    return (
        <>
            <button
                className={ InquiryCSS.inquiryDetail }
                onClick={ setVisible }    
            >
               자세히 
            </button>
            <Dialog
                header="문의 내용"
                visible={ visible }
                style={{ width: '50vw' }}
                onHide={ onHide }
            >
                { inquiry !== undefined
                  ? <div id={ InquiryCSS.inquiryDataInput }>
                        <label>제목</label>
                        <InputText
                            id={ InquiryCSS.inputTitle }
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value) }
                            />
                        <label>문의 유형</label>
                        <Dropdown
                            id={ InquiryCSS.inputOption }
                            optionLabel='label'
                            optionValue='value'
                            value={ categoryCode }
                            options={ categories }
                            onChange={ (e) => setCategoryCode(e.target.value) }
                            placeholder='문의 유형'
                        />
                        <label>작성자</label>
                        <InputText
                            id={ InquiryCSS.inputTitle }
                            value={ inquiry.memberName }
                            onChange={ (e) => setContent(e.target.value) }

                            readOnly
                        />
                        <label>작성일시</label>
                        <InputText
                            id={ InquiryCSS.inputTitle }
                            value={ inquiry.createdDate }
                            readOnly
                            />
                        <label>내용</label>
                        <InputTextarea
                            id={ InquiryCSS.inputContent }
                            rows={ 10 }
                            autoResize
                            value={ content }
                            onChange={ (e) => setContent(e.target.value) }
                        />
                        <label>답변</label>
                            <InputTextarea
                                id={ InquiryCSS.answer }
                                rows={ 5 }
                                autoResize
                                value={ null }
                                placeholder='답변이 없습니다.'
                                readOnly
                            />
                            <span id={ InquiryCSS.answerInfo }>
                                2020-20-20 20:20:20 등록됨
                            </span>
                        <div>
                            <button 
                                id={ InquiryCSS.createBtn }
                                onClick={ editInquiry }
                            >
                                수정
                            </button>
                            <button 
                                id={ InquiryCSS.removeBtn }
                                onClick={ removeInquiry }
                            >
                                삭제
                            </button>
                            <button 
                                id={ InquiryCSS.cancelBtn }
                                onClick={ onHide }
                            >
                                취소
                            </button>
                        </div>
                    </div>
                  : <div>상세 내용이 없습니다.</div>
                }
            </Dialog>
            <ConfirmDialog
                visible={ visibleConfirmDelete } 
                onHide={ () => setVisibleConfirmDelete(false) } 
                header='1:1 문의 삭제' 
                message='문의글을 삭제하시겠습니까?'
                icon='pi pi-info-circle' 
                acceptClassName='p-button-danger'
                accept={async () => await accept()} 
                reject={async () => await reject()} 
            />
        </>
    );
}

export default InquiryDetailModal;