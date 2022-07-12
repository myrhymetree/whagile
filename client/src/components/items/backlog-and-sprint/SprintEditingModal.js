import BacklogAndSprintCSS from './BacklogAndSprint.module.css';
import BacklogModalsCSS from './BacklogModals.module.css';

import { useState } from 'react';

import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

function SprintEditingModal() {
    
    const [displayDialog, setDisplayDialog] = useState(false);
    const [position, setPosition] = useState('center');
    
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    const onClick = (name, position) => {
        setDisplayDialog(true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (displayDialog) => {
        setDisplayDialog(false);
    }

    const editSprint = (displayDialog) => {
        /* endDate가 startDate보다 나중 날짜로 저장되었는지 유효성 체크 */
        alert('스프린트 수정 API 요청')
        /* 백로그 및 스프린트 첫화면으로 리다이렉트 */
    };
    
    const removeSprint = (displayDialog) => {
        alert('스프린트 삭제 api 요청');
        /* 백로그 및 스프린트 첫화면으로 리다이렉트 */
    };

    const renderFooter = (displayDialog) => {
        return (
            <div>
                <Button 
                    id={ BacklogModalsCSS.createBtn }
                    label="저장" 
                    icon="pi pi-check" 
                    onClick={ () => editSprint(displayDialog) } 
                    />
                <Button 
                    id={ BacklogModalsCSS.cancelBtn }
                    label="취소" 
                    icon="pi pi-times" 
                    onClick={ () => onHide(displayDialog) } 
                />
                <Button 
                    id={ BacklogModalsCSS.removeBtn }
                    label="스프린트 삭제" 
                    icon="pi pi-times" 
                    onClick={ () => removeSprint(displayDialog) } 
                />
            </div>
        );
    }

    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    let minDate = new Date();
    minDate.setMonth(prevMonth);
    minDate.setFullYear(prevYear);

    let maxDate = new Date();
    maxDate.setMonth(nextMonth);
    maxDate.setFullYear(nextYear);

    let invalidDates = [today];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });

    const dateTemplate = (date) => {
        if (date.day > 10 && date.day < 15) {
            return (
                <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
            );
        }

        return date.day;
    }
       
    return (
        <>
            <Button 
                id={ BacklogAndSprintCSS.editBtn } 
                label="편집" 
                icon="pi pi-pencil" 
                onClick={ () => onClick('displayDialog') } 
            />
            <Dialog 
                id={ BacklogModalsCSS.backlogCreationDialog }
                header="스프린트 편집" 
                visible={ displayDialog } 
                style={{ width: '30vw' }} 
                footer={ renderFooter('displayDialog') } 
                onHide={ () => onHide('displayDialog') }
            >
                <div className="field">
                    <label className="block">스프린트 제목*</label><br/>
                    <InputText 
                        id={ BacklogModalsCSS.inputTitle } 
                        aria-describedby="inputTitle-help" 
                        className="block"
                        value={ title }
                        onChange={ (e) => setTitle(e.value) }
                    />
                    <br/>
                    <small 
                        id="inputTitle-help" 
                        className="p-error block"
                    >
                        필수 입력 사항입니다.
                    </small>
                    <br/><br/>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="startDate">시작 날짜</label><br/>
                        <Calendar id="startDate" value={ startDate } onChange={ (e) => setStartDate(e.value) } dateFormat="yy-mm-dd hh:mm:ss" />
                    </div>
                    <br/>
                    <div className="field col-12 md:col-4">
                        <label htmlFor="EndDate">종료 날짜</label><br/>
                        <Calendar id="EndDate" value={ endDate } onChange={ (e) => setEndDate(e.value) } dateFormat="yy-mm-dd hh:mm:ss" />
                    </div>
                    <br/>
                </div>
                <label>스프린트 목표</label><br/>
                <InputTextarea 
                    id={ BacklogModalsCSS.inputDescription }
                    value={ description }
                    onChange={ (e) => setDescription(e.target.value) } 
                    rows={ 5 } 
                />
                <br/><br/>
            </Dialog>
        </>
    );
}

export default SprintEditingModal;