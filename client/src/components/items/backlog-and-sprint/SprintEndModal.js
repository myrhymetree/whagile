import BacklogModalsCSS from './BacklogModals.module.css';

import { useState } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

function SprintEndModal() {
    
    const [displayDialog, setDisplayDialog] = useState(false);
    const [position, setPosition] = useState('center');

    /* combineReducer로 관리할 것 */
    const sprintRetrospection = {
        taskAccomplished: 1,
        pendingTask: 2
    };

    const onClick = (displayDialog) => {
        setDisplayDialog(!displayDialog);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (displayDialog) => {
        setDisplayDialog(false);
    }

    const endSprint = (displayDialog) => {
        alert(`스프린트 종료 API 요청`)
        /* 백로그 및 스프린트 첫화면으로 리다이렉트 */
    };

    const renderFooter = (displayDialog) => {
        return (
            <div>
                <Button 
                    id={ BacklogModalsCSS.endBtn }
                    label="종료" 
                    icon="pi pi-check" 
                    onClick={ () => endSprint(displayDialog) }
                    />
                <Button 
                    id={ BacklogModalsCSS.cancelBtn }
                    label="취소" 
                    icon="pi pi-times" 
                    onClick={ () => onHide(displayDialog) } 
                />
            </div>
        );
    }
       
    return (
        <>
            <Button 
                id={ BacklogModalsCSS.sprintEndBtn } 
                label="스프린트 종료" 
                onClick={ () => onClick(displayDialog) } 
            />
            <Dialog 
                id={ BacklogModalsCSS.backlogCreationDialog }
                header="{스프린트 명} 종료" 
                visible={ displayDialog } 
                style={{ width: '30vw' }} 
                footer={ renderFooter('displayDialog') } 
                onHide={ () => onHide('displayDialog') }
            >
                <div className="field">
                    <label className="block">스프린트 기간</label><br/>
                    <div id={ BacklogModalsCSS.sprintTerm }>
                        <i className="pi pi-fw pi-check" /><label> { sprintRetrospection.taskAccomplished }개의 완료된 일감</label><br/>
                        <i className="pi pi-fw pi-check" /><label> { sprintRetrospection.pendingTask }개의 미해결 일감</label>
                    </div>
                </div>
                <br/><br/>
                <label>미해결 일감을 백로그로 이동합니다.</label><br/>
                <br/><br/>
            </Dialog>
        </>
    );
}

export default SprintEndModal;