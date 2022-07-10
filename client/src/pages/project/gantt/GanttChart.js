import GanttCss from './GanttChart.module.css';
import PageTitle from '../../../components/items/PageTitle';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import 'gantt-task-react/dist/index.css';
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { initTasks, getStartEndDateForProject } from './helpers';
import { ViewSwitcher } from './ViewSwitcher';
import { TaskListHeaderDefault } from './task-list-header';
import { TaskListTableDefault } from './task-list-table';
import { useSelector, useDispatch } from 'react-redux';
import { GET_SPRINTS } from '../../../modules/SprintsModule'
import { 
	callGetSpintsAPI
	, callGetSpintAPI
} from '../../../apis/SprintAPICalls';

// primereact
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Chips } from 'primereact/chips';

function GanttChart() {

	const [view, setView] = useState(ViewMode.Day);
	const [tasks, setTasks] = useState(initTasks());
	const [isChecked, setIsChecked] = useState(true);
	let columnWidth = 60;
	if (view === ViewMode.Month) {
	  	columnWidth = 300;
	} else if (view === ViewMode.Week) {
	  	columnWidth = 250;
	}

	const [dialogShow, setDialogShow] = useState(false); // 모달창 ON/OFF
	const [dialogMode, setDialogMode] = useState('');   // 모달창 스프린트 생성/수정인지(insert, update)
	const [alertVisible, setAlertVisible] = useState(false); // 스프린트 삭제 alert창 ON/OFF
	const [startDate, setStartDate] = useState(''); 
	const [endDate, setEndDate] = useState(''); 
	const sprints = useSelector(state => state.sprintsReducer);
	const sprint = useSelector(state => state.sprintReducer);
	const dispatch = useDispatch();
	const { projectCode } = useParams();

	const [values3, setValues3] = useState([]);
	const [tasksShow, setTasksShow] = useState(false);
	const [taskShow, setTaskShow] = useState(false);

	useEffect(
		() => {
			dispatch(callGetSpintsAPI({	// 스프린트 목록 조회
				'projectCode': parseInt(projectCode),
				'orderCondition': 'code',
				'orderValue': 'desc'
			}));
		},
		[]
	);

	const handleTaskChange = (task) => {
		console.log("On date change Id:" + task.id);
		let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
		if (task.project) {
			const [start, end] = getStartEndDateForProject(newTasks, task.project);
			const project = newTasks[newTasks.findIndex((t) => t.id === task.project)];
			if (
				project.start.getTime() !== start.getTime() ||
				project.end.getTime() !== end.getTime()
			) {
			const changedProject = { ...project, start, end };
			newTasks = newTasks.map((t) =>
				t.id === task.project ? changedProject : t
			);
			}
		}
		setTasks(newTasks);
	};
	
	const handleTaskDelete = (task) => {
		const conf = window.confirm("Are you sure about " + task.name + " ?");
		if (conf) {
			setTasks(tasks.filter((t) => t.id !== task.id));
		}
		return conf;
	};
  
	const handleProgressChange = async (task) => {
	  	setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
	 	console.log("On progress change Id:" + task.id);
	};
  
	const handleDblClick = (task) => {

		getSprint(task.id);

		onShowUpdate();

	 	console.log("On Double Click event Id:", task.id);

	};
  
	const handleSelect = (task, isSelected) => {
		console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
	};
  
	const handleExpanderClick = (task) => {
		setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
		console.log("On expander click Id:" + task.id);
	};

	const onShowInsert = () => { // 새 스프린트 생성

		setDialogMode('insert');

        setDialogShow(true);
    }

    const onShowUpdate = (e) => { // 스프린트 수정(간트차트 바 더블클릭)

		setDialogMode('update');

        setDialogShow(true);
    }

	const onChangeSprint = (e) => {
		console.log(e.target.value);
	};

	const confirmInsertSprint = () => {

		setDialogShow(false);
	};

	const confirmUpdateSprint = () => {

		setDialogShow(false);
	};

	const confirmDeleteSprint = () => {

		setAlertVisible(false);
		setDialogShow(false);
	}

	const cancelSprint = () => {

		setDialogShow(false);
	};

	const [selectedCities, setSelectedCities] = useState(null);
	const [selectedCity, setSelectedCity] = useState(null);

	const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

	const getSprint = (sprintCode) => {
		dispatch(callGetSpintAPI({	// 스프린트 단일 조회
			'sprintCode': parseInt(sprintCode),
		}));
	}

	const panelFooterTemplate = () => {
        const selectedItems = selectedCities;
        const length = selectedItems ? selectedItems.length : 0;
        return (
            <div className="py-2 px-3"
				style={{
					padding: '7px 20px',
					borderTop: '1px solid #333544'
				}}
			>
                <b>{length}</b>개의 백로그가 선택되었습니다.
            </div>
        );
    }

	const customChip = (item) => {
		return (
			<div>
				<span>{item} - (active) </span>
				<i className="pi pi-user-plus" style={{ fontSize: "14px" }}></i>
			</div>
		);
	};

	const confirmTasks = () => {

		setTasksShow(false);
	};

	const cancelTasks = () => {

		setTasksShow(false);
	};

	const confirmTask = () => {

		setTaskShow(false);
	};

	const cancelTask = () => {

		setTaskShow(false);
	};

	return (
		<>
			<PageTitle
				icon={ <i className="pi pi-fw pi-chart-bar"/> }
				text="간트차트"
			/>
		
			<ViewSwitcher
				onViewModeChange={(viewMode) => setView(viewMode)}
				onViewListChange={setIsChecked}
				isChecked={isChecked}
				onShowInsert={onShowInsert}
			/>

			<div id={GanttCss.container}>
				{
					(Object.keys(sprints).length !== 0)
					? <>
						<div 
							id={GanttCss.unfoldButton}
							onClick={() => setIsChecked(!isChecked)}
						>
							{
								(isChecked)
								? <i className="pi pi-angle-left"/>
								: <i className="pi pi-angle-right"/>
							}
						</div>
						<div id={GanttCss.ganttContainer}>
							<Gantt
								tasks={sprints}
								viewMode={view}
								onDateChange={handleTaskChange}
								onDelete={handleTaskDelete}
								onProgressChange={handleProgressChange}
								onDoubleClick={handleDblClick}
								onSelect={handleSelect}
								onExpanderClick={handleExpanderClick}
								listCellWidth={isChecked ? "155px" : ""}
								columnWidth={columnWidth}
								headerHeight="44"
								locale="kor"
								barCornerRadius="5"
								barProgressColor="skyblue"
								barProgressSelectedColor="coral"
								TaskListTable={TaskListTableDefault}
								TaskListHeader={TaskListHeaderDefault}
								todayColor="salmon"
							/>
						</div>
					</>
					: <div id={GanttCss.emptySprint}>
						<i className="pi pi-chart-bar" style={{fontSize: '20em', transform: 'rotate(90deg)'}} />
						<h1>생성된 스프린트가 없습니다.</h1>
					</div>
				}
			</div>

			{/* 스프린트 등록/수정 모달창 */}
            <Dialog 
				id={GanttCss.dialogContainer}
                visible={dialogShow} 
                style={{ width: '40vw', height: '75vh' }}
                onHide={() => cancelSprint()}
                header={
                    <div id={GanttCss.dialogHeader}>
                        <span>
                            { 
                                (dialogMode==='update')
                                ? `스프린트 수정`
                                : `스프린트 생성`
                            }
                        </span>
                    </div>
                }
                footer={
                    <div id={GanttCss.dialogFooter}>
                        <div>
                            { 
                                (dialogMode==='update') &&
                                <Button
                                    className="p-button-danger" 
                                    label="스프린트 삭제" 
                                    icon="pi pi-check" 
                                    onClick={() => setAlertVisible(true)} 
                                />
                            }
                        </div>
                        <div>
                            <Button 
                                label={
                                    (dialogMode==='update')
                                    ? '수정'
                                    : '등록'
                                }
                                icon="pi pi-check" 
                                onClick={
                                    () => {
                                        (dialogMode==='update')
                                        ? confirmUpdateSprint()
                                        : confirmInsertSprint()
                                    }
                                } 
                                autoFocus 
                            />
                            <Button 
                                className="p-button-text" 
                                label="취소" 
                                icon="pi pi-times" 
                                onClick={() => cancelSprint()} 
                            />
                        </div>
                    </div>
                } 
            >
                <div id={GanttCss.dialogBody}>
                    <div>
                        <label>스프린트 이름</label>
                        <InputText
                            name="sprintName"
                            value={sprint.sprintName || ''}
                            onChange={(e) => onChangeSprint(e)}
                            placeholder="필수 입력 사항입니다."
                        />
                        {/* <InputText className="p-invalid block"/> */}
                        {/* <small className="p-error block">Username is not available.</small> */}
                    </div>
					<div>
						<div>
							<div>
								<label>시작일</label>
								<Calendar 
									id="startDate" 
									value={sprint.sprintStartDate || ''} 
									showIcon
									onChange={(e) => {
										setStartDate(e.value);
										onChangeSprint(e);
									}}
								/>
								{/* <InputText className="p-invalid block"/> */}
								{/* <small className="p-error block">Username is not available.</small> */}
							</div>
							<div>
								<label>종료일</label>
								<Calendar 
									id="endDate" 
									value={sprint.sprintEndDate || ''} 
									showIcon
									onChange={(e) => {
										setEndDate(e.value);
										onChangeSprint(e);
									}}
								/>
								{/* <InputText className="p-invalid block"/> */}
								{/* <small className="p-error block">Username is not available.</small> */}
							</div>
						</div>
						<div>
							<label>스프린트 목표</label>
							<InputTextarea
								name="sprintTarget"
								value={sprint.sprintTarget || ''} 
								onChange={(e) => onChangeSprint(e)}
								rows={2} 
								cols={30} 
								style={{minHeight: '140px'}}
								autoResize 
							/>
						</div>
					</div>
					<div>
						<label>
							일감 목록
							<Button 
								label="수정하기"
								style={{height: '20px', marginLeft: '20px', backgroundColor: 'rgba(0, 170, 156, .16)', border: '1px solid #333544', color: '#00AA9C'}}
								onClick={() => setTasksShow(true)}
							/>
						</label>
						<Chips
							value={values3}
							onChange={(e) => {
								setValues3(e.value); 
								onChangeSprint(e);
							}}
							itemTemplate={customChip}
						/>
					</div>
                </div>
            </Dialog>

			{/* 일감 목록 수정 모달창 */}
            <Dialog 
                visible={tasksShow} 
                style={{ width: '35vw', height: '75vh' }}
                onHide={cancelTasks}
                header={ 
                    <h4>일감 목록 수정</h4>
                }
                footer={
                    <div style={{marginTop: '20px'}}>
                        <Button 
                            label="확인"
                            icon="pi pi-check"
                            onClick={confirmTasks}
                            autoFocus 
                        />
                        <Button 
                            label="취소" 
                            icon="pi pi-times" 
                            onClick={cancelTasks}
                            className="p-button-text"
                        />
                    </div>
                }
            >
                <div id={GanttCss.taskContainer}>
                    <div>
                        <label>진행 할 기존 백로그</label>
						<MultiSelect 
							className="multiselect-custom"
							value={selectedCities} 
							options={cities} 
							onChange={(e) => {
								setSelectedCities(e.value);
								onChangeSprint(e);
							}} 
							optionLabel="name" 
							placeholder="Select a City" 
							display="chip"
							filter
							panelFooterTemplate={panelFooterTemplate} 
						/>
					</div>

					<div>
                        <label>
							진행 할 신규 백로그
							<Button 
								label="추가하기"
								style={{height: '20px', marginLeft: '20px', backgroundColor: 'rgba(255, 185, 95, .16)', border: '1px solid #333544', color: '#FFB95F'}}
								onClick={() => setTaskShow(true)}
							/>
						</label>
						<Chips
							value={values3}
							onChange={(e) => {
								setValues3(e.value); 
								onChangeSprint(e);
							}}
							onClick={() => setTasksShow(true)}
							itemTemplate={customChip}
							style={{display: 'block'}}
						/>
                    </div>
                </div>
            </Dialog>

			{/* 신규 백로그 모달창 */}
            <Dialog 
                visible={taskShow} 
				position='right'
                style={{ width: '31vw', height: '75vh' }}
                onHide={cancelTask}
                header={ 
                    <h4>신규 백로그 추가</h4>
                }
                footer={
                    <div style={{marginTop: '20px'}}>
                        <Button 
                            label="확인"
                            icon="pi pi-check"
                            onClick={confirmTask}
                            autoFocus 
                        />
                        <Button 
                            label="취소" 
                            icon="pi pi-times" 
                            onClick={cancelTask}
                            className="p-button-text"
                        />
                    </div>
                }
            >
                <div id={GanttCss.taskContainer}>
					<div>
                        <label>백로그 제목</label>
                        <InputText
                            name="sprintName"
                            value={sprint.sprintName || ''}
                            onChange={(e) => onChangeSprint(e)}
                            placeholder="필수 입력 사항입니다."
                        />
                        {/* <InputText className="p-invalid block"/> */}
                        {/* <small className="p-error block">Username is not available.</small> */}
                    </div>
					<div>
                        <label>백로그 설명</label>
                        <InputText
                            name="sprintName"
                            value={sprint.sprintName || ''}
                            onChange={(e) => onChangeSprint(e)}
                            placeholder="필수 입력 사항입니다."
                        />
                        {/* <InputText className="p-invalid block"/> */}
                        {/* <small className="p-error block">Username is not available.</small> */}
                    </div>
					<div>
                        <label>세부정보</label>
						<div id={GanttCss.backlogContainer}>

							<div>
								<div>
									<label>카테고리</label>
								</div>
								<div>
									<label>시작일</label>
								</div>
								<div>
									<label>종료일</label>
								</div>
								<div>
									<label>긴급도</label>
								</div>
								<div>
									<label>담당자</label>
								</div>
							</div>
							<div>
								<Dropdown 
									value={selectedCity} 
									options={cities} 
									onChange={(e) => setSelectedCity(e.value)} 
									optionLabel="name" 
									placeholder="Select a City" 
								/>
								<Calendar 
									id="startDate" 
									value={sprint.sprintStartDate || ''} 
									showIcon
									onChange={(e) => {
										setStartDate(e.value);
										onChangeSprint(e);
									}}
								/>
								<Calendar 
									id="startDate" 
									value={sprint.sprintStartDate || ''} 
									showIcon
									onChange={(e) => {
										setStartDate(e.value);
										onChangeSprint(e);
									}}
								/>
								<Dropdown 
									value={selectedCity} 
									options={cities} 
									onChange={(e) => setSelectedCity(e.value)} 
									optionLabel="name" 
									placeholder="Select a City" 
								/>
								<Dropdown 
									value={selectedCity} 
									options={cities} 
									onChange={(e) => setSelectedCity(e.value)} 
									optionLabel="name" 
									placeholder="Select a City" 
								/>
							</div>

						</div>
                    </div>
                </div>
            </Dialog>

			{/* 스프린트 삭제 alert창 */}
			<ConfirmDialog 
                visible={ alertVisible } 
                onHide={() => setAlertVisible(false)} 
                header="권한 삭제" 
                message={<span>스프린트 삭제 시 하위 일감들은 백로그가 됩니다. <br/>해당 스프린트를 삭제하시겠습니까?</span>}
                icon="pi pi-exclamation-triangle"
                style={{width: '24vw'}}
                accept={() => confirmDeleteSprint()} 
                reject={() => setAlertVisible(false)} 
            />

			{/* 테스트창 */}
			<div
				style={{width: '20vw', height: '200px', backgroundColor: 'lightgreen', padding: '10px', color: 'black'}}
			>
				<ul>
					{ sprints.map((sprint, index) => <li key={index}>{sprint.id}</li>)}
				</ul>
			</div>
		</>
	);
}

export default GanttChart;