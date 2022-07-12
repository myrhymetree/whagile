import BacklogModalsCSS from './BacklogModals.module.css';

import { useState } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

function SprintStartModal() {
    
    const [displayDialog, setDisplayDialog] = useState(false);
    const [position, setPosition] = useState('center');
    
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    // const dialogFuncMap = {
    //     'displayDialog': setDisplayDialog
    // }

    const onClick = (displayDialog) => {
        setDisplayDialog(!displayDialog);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (displayDialog) => {
        setDisplayDialog(false);
    }

    const startSprint = (displayDialog) => {
        /* endDate가 startDate보다 나중 날짜로 저장되었는지 유효성 체크 */
        alert(`??`)
        /* 스프린트 생성 API 요청 */
        /* 백로그 및 스프린트 첫화면으로 리다이렉트 */
    };

    const renderFooter = (displayDialog) => {
        return (
            <div>
                <Button 
                    id={ BacklogModalsCSS.startBtn }
                    label="시작" 
                    icon="pi pi-check" 
                    onClick={ () => startSprint(displayDialog) }
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
                id={ BacklogModalsCSS.sprintStartBtn } 
                label="스프린트 시작" 
                onClick={ () => onClick(displayDialog) } 
            />
            <Dialog 
                id={ BacklogModalsCSS.backlogCreationDialog }
                header="스프린트 시작" 
                visible={ displayDialog } 
                style={{ width: '30vw' }} 
                footer={ renderFooter('displayDialog') } 
                onHide={ () => onHide('displayDialog') }
            >
                <div className="field">
                    <label className="block">스프린트 기간</label><br/>
                    <div id={ BacklogModalsCSS.sprintTerm }>
                        <label>시작일 </label><label> 2020.02.02</label><br/>
                        <label>종료일 </label><label> 2020.02.02</label>
                    </div>
                </div>
                <br/><br/>
                <label>n개의 일감을 스프린트에 포함합니다.</label><br/>
                <br/><br/>
            </Dialog>
        </>
    );
}

export default SprintStartModal;