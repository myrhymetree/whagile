import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import InvitingModal from '../../components/items/projects/InvitingModal';
import EmailItems from '../../components/items/projects/Emails';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { render } from 'react-dom';

function Regist() {
    const [name, setName ] = useState('');
    const [emails, setEmails ] = useState([
    //    {id: 0, address: ''} 
    ]);
    const [inputEmail, setInputEmail] = useState('');
    const [nextId, setNextId] = useState(1);

    const [description, setDescription ] = useState('');
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }
    
    const navigate = useNavigate();

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            </div>
        );
    }

    const addEmail = () => {

        const changeEmails = emails.concat({
            id: nextId,
            address: inputEmail
        });

        setInputEmail('');
        setNextId(nextId + 1);
        setEmails(changeEmails);
    }

    return(
        <>
            <div className="p-fluid grid">
                <div className="field col-12 md:col-4">
                    <label htmlFor="inputtext">프로젝트 이름</label>
                    <InputText id="inputtext1" value={name} onChange={(e) => setName(e.target.value)} className="p-invalid" />
                </div>
                <div className="field col-12 md:col-4">
                    <label htmlFor="inputtext">프로젝트 설명</label>
                    <InputText id="inputtext2" value={description} onChange={(e) => setDescription(e.target.value)} className="p-invalid" />
                </div>
            </div>

            <Button 
            type="click" 
            label="팀원 초대" 
            className="p-button-lg"
            onClick={ () => onClick('displayBasic')}
            />

            <Button 
                type="submit" 
                label="등록" 
                className="p-button-sm" 
            />
             <Button 
                type="click" 
                label="취소" 
                className="p-button-sm"
                onClick={ () => { navigate(`/projects`) }}
            />

            <Dialog 
                header="팀원 초대" 
                visible={displayBasic}
                footer={renderFooter('displayBasic')}
                onHide={() => onHide('displayBasic')}
                style={{ width: '50vw', height: '50%' }}
            >
                <div className="field col-12 md:col-4">
                    <label htmlFor="inputtext">이메일</label>
                    <InputText id="inputtext1" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} className="p-invalid" />
                    <Button type='click' label='추가'  icon='pi pi-plus' onClick={ addEmail }></Button>
                </div>
                <EmailItems 
                    emails={ emails } 
                    setEmails={ setEmails } 
                />   
            </Dialog>
        </>
    );
}

export default Regist;