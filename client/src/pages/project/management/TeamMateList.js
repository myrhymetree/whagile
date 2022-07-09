import PageTitle from '../../../components/items/PageTitle';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetProjectMemberAPI } from '../../../apis/ProjectAPICalls';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Row } from 'primereact/row';

function TeamMateList() {

    // const [searchValue, setSearchValue ] = useState('');
    // const dispatch = useDispatch();
    // const toast = useRef(null);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [selectedProduct1, setSelectedProduct1] = useState(null);

    // useEffect(
    //     () => {
    //         dispatch(callGetProjectsAPI({
    //             'loginMember': (decoded !== 'undefined')? decoded.code: '',
    //             'searchValue': searchValue
    //         }));
    //     },
    //     [searchValue]
    // );

    return (
        <>
            <PageTitle 
                icon={<i className="pi pi-fw pi-cog"></i>}
                text="프로젝트 팀원목록"
            />

        </>
    );
}

export default TeamMateList;