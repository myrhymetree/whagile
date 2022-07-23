import '../AdminStyle.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetInquiriesAPI } from '../../../apis/InquiryAPICalls';

import PageTitle from '../../../components/items/PageTitle';
import InquiryTable from '../../../components/items/inquiry/InquiryTable';

function AdminInquery() {
    
    const dispatch = useDispatch();
    const inquiries = useSelector(state => state.inquiriesReducer);
    const inquiryComment = useSelector(state => state.inquiryCommentReducer);

    useEffect(
        () => {
            dispatch(callGetInquiriesAPI({
                offset: 0,
                limit: 10
            }));
        },
        []
    );

    useEffect(
        () => {
            if(inquiryComment.status === 200 || inquiryComment.status === 201) {
                alert(inquiryComment.message);
            }
        },
        [inquiryComment]
    );

    return (
        <section className="section">
            <PageTitle 
                icon={<i className="pi pi-fw pi-phone"></i>}
                text="고객센터"
            />
            <InquiryTable inquiries={ inquiries }/>
        </section>
    );
}

export default AdminInquery;