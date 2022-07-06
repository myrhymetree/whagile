import PageTitle from '../../../components/items/PageTitle';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callGetProjectMemberAPI, callPutProjectAPI } from '../../../apis/ProjectAPICalls';
import { callGetProjectAPI } from '../../../apis/ProjectAPICalls';
import { useForm, Controller, FieldError } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';

function Information() {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { projectCode } = useParams();
    const project = useSelector(state => state.projectsReducer);
    const memberList = useSelector(state => state.projectMemberReducer);
    console.log(project);
    console.log(memberList);
    const [teamMates, setTeamMates] = useState([]);
    const [projectName, setProjectName ] = useState((project.length !== 0)? project[0].projectName: '');
    const [projectDescription, setProjectDescription ] = useState((project.length !== 0)? project[0].projectDescription: '');
    const [selectedProjectOwner, setSelectedProjectOwner] = useState((project.length !== 0)? project[0].projectOwnerCode: '');
    console.log(selectedProjectOwner);
    
    useEffect(
        () =>
        {
             dispatch(callGetProjectAPI({
                'projectCode': projectCode
            }));
            dispatch(callGetProjectMemberAPI({
                'projectCode': projectCode
            }));
            setTeamMates(memberList);
            // setSelectedProjectOwner((memberList.length !== 0)? memberList[0].memberName: '');
        },
        []
      );

    const defaultValues = {
        projectCode: projectCode,
        projectName : projectName,
        projectDescription : projectDescription,
        projectOwner: selectedProjectOwner
    };

    const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues });

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const acceptFunc = async () => { await dispatch(callPutProjectAPI(projectCode, projectName, projectDescription, selectedProjectOwner));
        await toast.current.show({ severity: 'info', summary: 'Confirmed', detail: '프로젝트 수정을 완료했습니다.', life: 3000 })};

    const submitHandler = async (data) => {
        console.log('안녕');
        await setProjectDescription(data.projectDescription);
        await setProjectName(data.projectName);
        await confirmDialog({
            message: '정말 프로젝트 수정을 하시겠습니까?',
            header: '프로젝트 수정',
            icon: 'pi pi-exclamation-triangle',
            accept: () => acceptFunc(),
            reject: () => toast.current.show({ severity: 'warn', summary: '취소', detail: '취소했습니다.', life: 3000 })
        });
    }

    const onProjectMemberChange = (e) => {
        setSelectedProjectOwner(e.value);
    }

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <PageTitle 
                icon={<i className="pi pi-fw pi-cog"></i>}
                text="프로젝트 상세정보"
            />
            <form 
                style={{display: 'flex', flexDirection: 'column' }}
                onSubmit={handleSubmit(submitHandler)}
                className="p-fluid"
            >
                <div className="p-fluid grid">
                    <div className="field col-12 md:col-4">
                        <label htmlFor="inputtext">프로젝트 이름</label>
                        <Controller 
                                name="projectName" 
                                control={control} 
                                rules={{ required: '프로젝트 이름은 필수입니다.' }} 
                                render={({ field, fieldState }) => (
                                    <InputText 
                                        id={field.name} 
                                        {...field}
                                        onChange={ (e) => {setProjectName(e.target.value)}}
                                        value={ projectName }
                                        autoComplete="off" 
                                        autoFocus 
                                        className={classNames({ 'p-invalid': fieldState.invalid })} 
                                    />
                            )} />
                            {getFormErrorMessage('projectName')}
                    </div>

                    <div className="field col-12 md:col-4">
                        <label htmlFor="inputtext">프로젝트 설명</label>
                        <Controller 
                                name="projectDescription" 
                                control={control} 
                                rules={{ required: '프로젝트 설명은 필수입니다.' }} 
                                render={({ field, fieldState }) => (
                                    <InputText 
                                        id={field.name} 
                                        {...field}
                                        onChange={ (e) => {setProjectDescription(e.target.value)}}
                                        value={ projectDescription }
                                        autoComplete="off" 
                                        autoFocus 
                                        className={classNames({ 'p-invalid': fieldState.invalid })} 
                                    />
                            )} />
                        {getFormErrorMessage('projectDescription')}
                    </div>

                    <div>
                        <Dropdown 
                            value={selectedProjectOwner} 
                            options={teamMates} 
                            onChange={onProjectMemberChange} 
                            optionValue="memberCode" 
                            optionLabel="memberName" 
                        />
                    </div>
                    
                </div>

                <Button 
                    type="submit" 
                    label="수정" 
                    className="p-button-sm"
                />
            </form>
        </>
        
    );
}

export default Information;