import PageTitle from '../../components/items/PageTitle';
import MainHeader from '../../components/commons/MainHeader';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { callPostProjectAPI } from '../../apis/ProjectAPICalls';
import EmailItems from '../../components/items/projects/Emails';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { render } from 'react-dom';


function Regist() {

    let emptyEmails = [];
    // const registedMembers = useSelector(state => state.projectMemberReducer);
    const [projectName, setProjectName ] = useState('');
    const [projectDescription, setProjectDescription ] = useState('');
    const [emails, setEmails ] = useState([]);
    const [inputEmail, setInputEmail] = useState('');
    // const [clients, setClients] = useState([]);
    // console.log('이미 가입한 회원들 : ', clients);
    const [nextId, setNextId] = useState(1);

    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayBasic2, setDisplayBasic2] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [position, setPosition] = useState('center');
    const toast = useRef(null);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayBasic2': setDisplayBasic2,
        'displayModal': setDisplayModal,
        'displayMaximizable': setDisplayMaximizable,
        'displayPosition': setDisplayPosition,
        'displayResponsive': setDisplayResponsive
    }

    const defaultValues = {
        projectName : projectName,
        projectDescription : projectDescription
    };

    const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

    
    const getFormErrorMessage = (name) => {
        console.log('name',name);
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const inviteMember = async() => {
        await toast.current.show({ severity: 'info', summary: 'Confirmed', detail: '초대할 팀원의 이메일을 입력했습니다.', life: 3000 });
    };

    const renderFooter = (name) => {
        return (
            <div>
                <Button type="button" label="등록" icon="pi pi-check" onClick={() => {inviteMember(name); onHide(name);}} />
                <Button label="취소" icon="pi pi-times" onClick={() => {onHide(name); setEmails(emptyEmails);}} className="p-button-text" />
            </div>
        );
    }

    const addEmail = async() => {

        const changeEmails = await emails.concat({
            id: nextId,
            address: inputEmail
        });

        await setInputEmail('');
        await setNextId(nextId + 1);
        await setEmails(changeEmails);
    }

    const submitHandler = async (data) => {
        console.log(data);
        await setProjectDescription(data.projectDescription);
        await setProjectName(data.projectName);
        await confirmDialog({
            message: '정말 프로젝트 생성을 하시겠습니까?',
            header: '프로젝트 생성',
            icon: 'pi pi-exclamation-triangle',
            accept: () => acceptFunc(),
            reject: () => toast.current.show({ severity: 'warn', summary: '취소', detail: '취소했습니다.', life: 3000 })
        });
    }

    const acceptFunc = async () => { 
        await dispatch(callPostProjectAPI(projectName, projectDescription, emails));
        setEmails(emptyEmails);
        setProjectName('');
        setProjectDescription('');
        await toast.current.show({ severity: 'info', summary: 'Confirmed', detail: '프로젝트 생성을 완료했습니다.', life: 3000 });
    };

    // useEffect(
    //     () => {
    //        console.log('가입된 회원입니다.', registedMembers);
           
    //     },
    //     [registedMembers]
    // );
    

    return(
        <>
            <Toast ref={toast} />
            <MainHeader />
            <PageTitle icon={ <i className="pi pi-fw pi-plus"></i>} text="프로젝트 생성" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}/>
            <main style={{ width: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center'  }}>
                <div className="card">
                    <form 
                        style={{display: 'flex', flexDirection: 'column' }}
                        onSubmit={handleSubmit(submitHandler)}
                        className="p-fluid"
                    >
                        <div className="p-fluid grid">
                            <div className="field col-12 md:col-4">
                                <label htmlFor="projectName">프로젝트 이름</label>
                                <Controller 
                                        name="projectName" 
                                        control={control} 
                                        // rules={{ required: '프로젝트 이름은 필수입니다.' }} 
                                        render={({ field, fieldState }) => (
                                            <InputText 
                                                id={field.name} 
                                                {...field}
                                                ref={handleSubmit}
                                                value={ projectName }
                                                onChange={ (e) => setProjectName(e.target.value)}
                                                autoComplete="off" 
                                                autoFocus 
                                                className={classNames({ 'p-invalid': fieldState.invalid })} 
                                            />
                                    )} />
                                    {/* {getFormErrorMessage('projectName')} */}
                            </div>

                            <div className="field col-12 md:col-4">
                                <label htmlFor="inputtext">프로젝트 설명</label>
                                <Controller 
                                        name="projectDescription" 
                                        control={control} 
                                        // rules={{ required: '프로젝트 설명은 필수입니다.' }} 
                                        render={({ field, fieldState }) => (
                                            <InputText 
                                                id={field.name} 
                                                {...field}
                                                ref={handleSubmit}
                                                onChange={ (e) => setProjectDescription(e.target.value)}
                                                value={ projectDescription }
                                                autoComplete="off" 
                                                autoFocus 
                                                className={classNames({ 'p-invalid': fieldState.invalid })} 
                                            />
                                    )} />
                                {/* {getFormErrorMessage('projectDescription')} */}
                            </div>
                        </div>
                        <div>
                            <Button 
                            type="button"
                            icon="pi pi-user-plus" 
                            label="팀원 초대" 
                            className="p-button-lg"
                            onClick={ () => onClick('displayBasic')}
                            />
                        </div>

                        <div style={{ display: 'flex', alignContent: 'center', flexDirection: 'column' }}>
                            <Button 
                                type="submit"
                                icon="pi pi-check"
                                label="등록" 
                                className="p-button-lg"
                            />
                            <Button 
                                type="click"
                                icon="pi pi-times"
                                label="취소" 
                                className="p-button-lg"
                                onClick={ () => { navigate(`/projects`) }}
                            />
                        </div>
                            
                    </form>
                </div>
            </main>

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
            <ConfirmDialog />
        </>
    );
}

export default Regist;