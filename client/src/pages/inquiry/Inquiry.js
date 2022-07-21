import InquiryCSS from './Inquiry.module.css';

import { useEffect, useState } from 'react';

import MainHeader from '../../components/commons/MainHeader';
import PageTitle from '../../components/items/PageTitle';
import { InputText } from 'primereact/inputtext';
import InquiryCreationModal from './InquiryCreationModal';
import { useSelector } from 'react-redux';
import inquiryReducer from '../../modules/InquiryModule';

function Inquiry() {

    const [searchValue, setSearchValue] = useState('');
    const [visible, setVisible] = useState(false);
    const inquiry = useSelector(state => state.inquiryReducer);

    useEffect(
        () => {
            if(inquiry.status === 200 || inquiry.status === 201) {
                alert(inquiry.message);
            }
        },
        [inquiry]
    );

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
                        <button>전체</button>
                        <button>미답변</button>
                        <button>답변완료</button>
                    </div>
                    <div id={ InquiryCSS.tableHeader }>
                        <div>번호</div>
                        <div>제목</div>
                        <div>작성시간</div>
                        <div>작성자</div>
                        <div>문의유형</div>
                        <div>답변상태</div>
                    </div>
                    {/* { 
                        inquiries.map(inquiry =>  */}
                            <div className={ InquiryCSS.tableRow }>
                                <div>번호</div>
                                <div>제목</div>
                                <div>작성시간</div>
                                <div>작성자</div>
                                <div>문의유형</div>
                                <div>답변상태</div>
                            </div>
                        {/* ) 
                    } */}
                </div>
                <InquiryCreationModal 
                    visible={ visible }
                    setVisible={ setVisible }
                />
            </div>
        </>
    );
}

export default Inquiry;