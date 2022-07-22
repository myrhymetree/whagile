import InquiryCSS from './Inquiry.module.css';

import { useEffect, useState } from 'react';
import { callGetInquiriesAPI, callGetInquiryDetailAPI } from '../../apis/InquiryAPICalls';

import MainHeader from '../../components/commons/MainHeader';
import PageTitle from '../../components/items/PageTitle';
import { InputText } from 'primereact/inputtext';
import InquiryCreationModal from './InquiryCreationModal';
import InquiryDetailModal from './InquiryDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function Inquiry() {

    const dispatch = useDispatch();
    const inquiries = useSelector(state => state.inquiriesReducer);
    const inquiry = useSelector(state => state.inquiryReducer);

    /* 페이징 및 검색 조건 */
    const [offset, setOffset] = useState(0);
    const [filter, setFilter] = useState('');
    const [searchValue, setSearchValue] = useState('');

    const [visibleCreation, setVisibleCreation] = useState(false);

    /* 1:1문의 등록, 수정, 삭제 확인 메시지 표시 */
    useEffect(
        () => {
            if(inquiry.status === 200 || inquiry.status === 201) {
                alert(inquiry.message);
            }
        },
        [inquiry]
    );

    useEffect(
        () => {
            dispatch(callGetInquiriesAPI({
                offset: 0,
                limit: 10
            }));
        },
        []
    );

    /* 필터 조건 부여하여 목록 조회 */
    const getFilteredList = (filteredValue) => {
        setFilter(filteredValue);

        const params = {
            offset: 0,
            limit: 10,
            filter: filter
        }

        console.log(params)
        dispatch(callGetInquiriesAPI(params));
    }

    return (
        <>
            <MainHeader/>
            <div id={ InquiryCSS.pageLayout }>
                <PageTitle
                    icon={ <i className="pi pi-fw pi-envelope"></i> }
                    text="1:1 문의"
                />
                <div id={ InquiryCSS.main }>
                    <div>
                        문의 목록
                    </div>
                        {/* <div id={ InquiryCSS.searchBar }>
                            <label>제목 검색</label> 
                            <InputText
                                id="searchValue"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div> */}
                    <div id={ InquiryCSS.filter }>
                        필터 
                        <button
                            onClick={ () => getFilteredList('') }
                        >
                            전체
                        </button>
                        <button
                            onClick={ () => getFilteredList('N') }
                        >
                            미답변
                        </button>
                        <button
                            onClick={ () => getFilteredList('Y') }
                        >
                            답변완료
                        </button>
                    </div>
                    <div id={ InquiryCSS.tableHeader }>
                        <div>번호</div>
                        <div>제목</div>
                        <div>작성시간</div>
                        <div>작성자</div>
                        <div>문의유형</div>
                        <div>답변상태</div>
                        <div>자세히</div>
                    </div>
                    { 
                        inquiries.length > 0
                        ? inquiries.map(inquiry => 
                            <div key={ inquiry.inquiryCode } className={ InquiryCSS.tableRow }>
                                <div>{ inquiry.inquiryCode }</div>
                                <div>{ inquiry.title }</div>
                                <div>{ inquiry.createdDate }</div>
                                <div>{ inquiry.memberName }</div>
                                <div>{ inquiry.categoryName }</div>
                                <div>{ inquiry.answeredYN === 'N'? '미답변' : '답변완료' }</div>
                                <div>
                                    <InquiryDetailModal inquiry={ inquiry }/>
                                </div>
                            </div>
                        ) 
                        : <div id={ InquiryCSS.noInquiry }>등록된 문의 글이 없습니다.</div>
                    }
                </div>
                <InquiryCreationModal 
                    visibleCreation={ visibleCreation }
                    setVisibleCreation={ setVisibleCreation }
                />
            </div>
        </>
    );
}

export default Inquiry;