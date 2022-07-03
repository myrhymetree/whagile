import BacklogModalsCSS from './BacklogModals.module.css';

import { useState } from 'react';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

function BacklogCreationModal() {
    
    const [displayDialog, setDisplayDialog] = useState(false);
    const [position, setPosition] = useState('center');
    
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedProgressStatus, sstSelectedProgressStatus] = useState(null);
    const [selectedUrgency, setSelectedUrgency] = useState(null);

    const dialogFuncMap = {
        'displayDialog': setDisplayDialog
    }

    const categoryOptions = [
        { name: '기본', value: 'NY' },
        { name: '이슈', value: 'PRS' }
    ];
    const progressStatusOptions = [
        { name: '진행 전', value: 'NY' },
        { name: '진행 중', value: 'RM' },
        { name: '완료', value: 'LDN' }
    ];
    const urgencyOptions = [
        { name: '낮음', value: 'NY' },
        { name: '보통', value: 'RM' },
        { name: '긴급', value: 'LDN' }
    ];
    
    const onCategoryChange = (e) => {
        setSelectedCategory(e.value);
    }

    const onProgressStatusChange = (e) => {
        sstSelectedProgressStatus(e.value);
    }

    const onUrgencyChange = (e) => {
        setSelectedUrgency(e.value);
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
                <Button 
                    id={ BacklogModalsCSS.createBtn }
                    label="만들기" 
                    icon="pi pi-check" 
                    onClick={() => onHide(name)} autoFocus 
                    />
                <Button 
                    id={ BacklogModalsCSS.cancelBtn }
                    label="취소" 
                    icon="pi pi-times" 
                    onClick={() => onHide(name)} 
                />
            </div>
        );
    }
       
    return (
        <>
            <Button 
                id={ BacklogModalsCSS.backlogCreationBtn } 
                label="백로그 추가하기" 
                icon="pi pi-plus" 
                onClick={() => onClick('displayDialog')} 
            />
            <Dialog 
                id={ BacklogModalsCSS.backlogCreationDialog }
                header="백로그 생성" 
                visible={ displayDialog } 
                style={{ width: '30vw' }} 
                footer={ renderFooter('displayDialog') } 
                onHide={ () => onHide('displayDialog') }
            >
                <div className="field">
                    <label className="block">제목*</label><br/>
                    <InputText 
                        id={ BacklogModalsCSS.inputTitle } 
                        aria-describedby="inputTitle-help" 
                        className="block"
                        required 
                        value={ title }
                    />
                    <br/>
                    <small id="inputTitle-help" className="p-error block">필수 입력 사항입니다.</small>
                    <br/><br/>
                </div>
                <label>설명</label><br/>
                <InputTextarea 
                    id={ BacklogModalsCSS.inputDescription }
                    value={ description }
                    onChange={ (e) => setDescription(e.target.value) } 
                    rows={ 5 } 
                />
                <br/><br/>
                <div id={ BacklogModalsCSS.dropdownArea }>
                    <Dropdown 
                        value={ selectedCategory } 
                        options={ categoryOptions } 
                        optionLabel="name" 
                        optionValue="value" 
                        onChange={ onCategoryChange } 
                        placeholder="카테고리" 
                        />
                    <Dropdown 
                        value={ selectedProgressStatus } 
                        options={ progressStatusOptions } 
                        optionLabel="name" 
                        optionValue="value" 
                        onChange={ onProgressStatusChange } 
                        placeholder="진행상태" 
                        />
                    <Dropdown 
                        value={ selectedUrgency } 
                        options={ urgencyOptions } 
                        onChange={ onUrgencyChange } 
                        optionLabel="name" 
                        optionValue="value" 
                        placeholder="긴급도" 
                    />
                    <br/><br/>
                </div>
            </Dialog>
        </>
    );
}

export default BacklogCreationModal;