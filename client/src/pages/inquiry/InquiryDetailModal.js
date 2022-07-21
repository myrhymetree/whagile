import InquiryCSS from './Inquiry.module.css';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetInquiryDetailAPI } from '../../apis/InquiryAPICalls';

import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

function InquiryDetailModal({ visibleDetail, setVisibleDetail }) {

    const dispatch = useDispatch();
    const inquiry = useSelector(state => state.inquiryReducer);

    useEffect(
        () => {
            setTitle(inquiry.title);
            setContent(inquiry.content);
            setCategoryCode(inquiry.categoryCode);
        },
        []
    );

    /* 1:1 문의 등록 데이터 임시 저장용 state */
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categoryCode, setCategoryCode] = useState(0);

    /* 문의 유형 */
    const categories = [
        { label: '일반', value: 1 },
        { label: '버그 신고', value: 2 },
        { label: '결제 및 환불', value: 3 },
        { label: '건의 사항', value: 4 },
    ];

    /* 문의 수정 요청 */
    const editInquiry = () => {
        console.log('*********')
    };

    /* 문의 삭제 요청 */
    const removeInquiry = () => {
        /* 답변 완료 상태의 문의글은 삭제할 수 없다. */
    };

    /* 다이얼로그 닫기 */
    const onHide = () => { 
        console.log('????????????', inquiry);

        setVisibleDetail(false);
        /* 임시저장 데이터 초기화 */
        setTitle(inquiry.title);
        setContent(inquiry.content);
        setCategoryCode(inquiry.categoryCode);
    }

    return (
        <>
            <Dialog
                header="문의 내용"
                visible={ visibleDetail }
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
                            valueTemplate={ inquiry.categoryName }
                            value={ categoryCode }
                            options={ categories }
                            onChange={ (e) => setCategoryCode(e.target.value) }
                            placeholder='문의 유형'
                            disabled
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
                            rows={ 15 }
                            autoResize
                            value={ content }
                            onChange={ (e) => setContent(e.target.value) }
                        />
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
        </>
    );
}

export default InquiryDetailModal;