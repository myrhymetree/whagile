import '../AdminStyle.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callGetInquiriesAPI } from '../../../apis/InquiryAPICalls';

import PageTitle from '../../../components/items/PageTitle';
import InquiryTable from '../../../components/items/inquiry/InquiryTable';

function AdminInquery() {
    
    const dispatch = useDispatch();
    const inquiries = useSelector(state => state.inquiriesReducer);

    useEffect(
        () => {
            dispatch(callGetInquiriesAPI({
                offset: 0,
                limit: 10
            }));
        },
        []
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