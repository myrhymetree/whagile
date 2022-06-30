import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';

function BacklogCreationModal() {
    
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
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }
    
    return (
        <>
            <Button id={ BacklogAndSprintCSS.backlogCreationBtn } label="백로그 추가하기" icon="pi pi-plus" onClick={() => onClick('displayBasic2')} />
            <Dialog header="Header" visible={displayBasic2} style={{ width: '50vw' }} footer={renderFooter('displayBasic2')} onHide={() => onHide('displayBasic2')}>
                <p></p>
                <br />
                <p></p>
                <br />
                <p></p>
                <br />
                <p></p>
                <br />
                <p></p>
                <br />
                <p></p>
                <br />
            </Dialog>
        </>
    );
}

export default BacklogCreationModal;