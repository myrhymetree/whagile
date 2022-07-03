import React, { useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function InvitingModal() {

    const [email, setEmail ] = useState([]);

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
    
    return(
        <Dialog 
            header="Header" 
            visible={displayBasic}
            footer={renderFooter('displayBasic')}
            onHide={() => onHide('displayBasic')}
        >
            <div className="field col-12 md:col-4">
                <label htmlFor="inputtext">팀원 초대</label>
                <InputText id="inputtext1" value={email} onChange={(e) => setEmail(e.target.value)} className="p-invalid" />
            </div>
        </Dialog>
    );
}

export default InvitingModal;