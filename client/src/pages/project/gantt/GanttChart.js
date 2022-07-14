// common, css
import PageTitle from '../../../components/items/PageTitle';
import 'gantt-task-react/dist/index.css';
import GanttCss from './GanttChart.module.css';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// gantt-task-react
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { ViewSwitcher } from './ViewSwitcher';
import { TaskListHeaderDefault } from './task-list-header';
import { TaskListTableDefault } from './task-list-table';
// import { initTasks, getStartEndDateForProject } from './helpers';

// apis, modules
import { callGetSprintsAPI, callGetSprintAPI, callGetBacklogsAPI} from '../../../apis/SprintAPICalls';
import { SET_COLLAPSED_SPRINTS, UPDATE_TASKS_GANTT } from "../../../modules/SprintsModule";
import { SET_SPRINT, INIT_SPRINT } from "../../../modules/SprintModule";

// primereact
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { Toast } from 'primereact/toast';

function GanttChart() {

	const [view, setView] = useState(ViewMode.Day);
	const [isChecked, setIsChecked] = useState(true);
	let columnWidth = 60;
	if (view === ViewMode.Month) {
	  	columnWidth = 300;
	} else if (view === ViewMode.Week) {
	  	columnWidth = 250;
	}

	const sprints = useSelector(state => state.sprintsReducer);
	const sprint = useSelector(state => state.sprintReducer);
	const backlogs = useSelector(state => state.sprintBacklogReducer);
	const dispatch = useDispatch();
	const { projectCode } = useParams();
	const [dialogShow, setDialogShow] = useState(false); // 모달창 ON/OFF
	const [dialogMode, setDialogMode] = useState('');   // 모달창 스프린트 생성/수정인지(insert, update)
	const [alertVisible, setAlertVisible] = useState(false); // 스프린트 삭제 alert창 ON/OFF
	const [tasksShow, setTasksShow] = useState(false);
	const [taskShow, setTaskShow] = useState(false);
	const [values3, setValues3] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [tasksSum, setTasksSum] = useState([]);
	const [tasksSumCount, setTasksSumCount] = useState([]);
	const [oldBacklogs, setOldBacklogs] = useState([]);
	const [selectedOldBacklogs, setSelectedOldBacklogs] = useState([]);
	const [newBacklogs, setNewBacklogs] = useState([]);
	const [newBacklogsObject, setNewBacklogsObject] = useState([]);
	const [newBacklog, setNewBacklog] = useState({
		backlogTitle: '',
		backlogDescription: '',
		backlogStartDate: '',
		backlogEndDate: '',
		backlogUrgency: '보통',
		backlogIssue: 0,
		backlogChargerCode: '',
	});

	const options = {
		urgency: [
			{name: '보통', value: '보통'},
			{name: '긴급', value: '긴급'},
			{name: '낮음', value: '낮음'},
		],
		issue: [
			{name: '보통', value: 0},
			{name: '이슈', value: 1},
		],
	};

	useEffect(
		() => {
			dispatch(callGetSprintsAPI({	// 스프린트 목록 조회
				'projectCode': parseInt(projectCode),
				'isGantt': true
			}));
		},
		[]
	);

	useEffect( // 다른 스프린트로 변경 시 tasks(state)도 변경
		() => {
			if(dialogMode === 'update') {
				setTasks((Object.keys(sprint).length > 0)
					? sprint.tasks.map((task) => {
						return {
							name: task.backlogTitle,
							code: task.backlogCode,
							type: 'task'
						}
					})
					: []
				);
			}
		},
		[sprint]
	);

	useEffect( // 백로그 목록 불러오기
		() => {
			setOldBacklogs((Object.keys(backlogs).length > 0)
			? backlogs.map((backlog) => {
				return {
					name: backlog.backlogTitle,
					code: backlog.backlogCode,
					type: 'oldBacklog'
				}
			})
			: []
			);
		},
		[backlogs]
	);

	useEffect( // 일감, 기존백로그, 신규백로그가 변화할 때 생성/수정 모달의 일감목록을 변화시킴
		() => {
			let allTasks = [];
			let allTasksCount = [];
			
			allTasks = allTasks.concat(tasks, selectedOldBacklogs, newBacklogs);
			allTasksCount = allTasksCount.concat(tasks.length, selectedOldBacklogs.length, newBacklogs.length);
			// console.log(111, tasks)
			// console.log(222, selectedOldBacklogs)
			// console.log(333, newBacklogs)
			console.log(444, allTasks)
			
			setTasksSum(allTasks);
			setTasksSumCount(allTasksCount);
		},
		[tasks, selectedOldBacklogs, newBacklogs]
	);
	
	/* Gantt컴포넌트에서 사용되는 메서드들 */
	const handleTaskChange = (task) => {
		console.log("On date change Id:" + task.id);

		dispatch({ 
            type: UPDATE_TASKS_GANTT,
			payload: task
		});

		// let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
		
		// if (task.project) {
		// 	const [start, end] = getStartEndDateForProject(newTasks, task.project);
		// 	const project = newTasks[newTasks.findIndex((t) => t.id === task.project)];
		// 	if (
		// 		project.start.getTime() !== start.getTime() ||
		// 		project.end.getTime() !== end.getTime()
		// 	) {
		// 	const changedProject = { ...project, start, end };
		// 	newTasks = newTasks.map((t) =>
		// 		t.id === task.project ? changedProject : t
		// 	);
		// 	}
		// }
		// setTasks(newTasks);
	};
	
	// const handleTaskDelete = (task) => {
	// 	const conf = window.confirm("Are you sure about " + task.name + " ?");
	// 	if (conf) {
	// 		setTasks(tasks.filter((t) => t.id !== task.id));
	// 	}
	// 	return conf;
	// };
  
	const handleProgressChange = async (task) => {

		dispatch({ 
            type: SET_COLLAPSED_SPRINTS,
			payload: task
		});

	  	// setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
	 	// console.log("On progress change Id:" + task.id);
		
	};
  
	const handleDblClick = (task) => {

		dispatch(callGetSprintAPI({	// 스프린트 단일 조회
			'sprintCode': parseInt(task.id),
		}));

		dispatch(callGetBacklogsAPI({	// 스프린트 단일 조회
			'offset': 0,
			'limit': 100,
			'projectCode': projectCode
		}));

		onShowUpdate();

	 	console.log("On Double Click event Id:", task.id);

	};
  
	const handleSelect = (task, isSelected) => {
		console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
	};
  
	const handleExpanderClick = (task) => { // 간트차트에서 스프린트를 눌러 일감을 펼치기/접기

		dispatch({ 
            type: SET_COLLAPSED_SPRINTS,
			payload: task
		});

		// setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
		// console.log("On expander click Id:" + task.id);

	};


	/* 스프린트 등록/수정 모달창(dialogShow) */
	const onShowInsert = () => { // 새 스프린트 생성

		dispatch(callGetBacklogsAPI({	// 스프린트 단일 조회
			'offset': 0,
			'limit': 100,
			'projectCode': projectCode
		}));

		setDialogMode('insert');

        setDialogShow(true);
    }

    const onShowUpdate = () => { // 스프린트 수정(간트차트 바 더블클릭)

		setDialogMode('update');

        setDialogShow(true);
    }

	const onChangeSprint = (e) => {
		
		let params = {
            ...sprint,
            [e.target.name]: e.target.value
        };
		
		dispatch({ 
            type: SET_SPRINT, 
            payload: params
        })

	};

	const initBacklogs = () => { // 백로그 관련 state를 초기화 함 
		setOldBacklogs([]);
		setSelectedOldBacklogs([]);
		setNewBacklogs([]);
		setNewBacklogsObject([]);
	}

	const confirmInsertSprint = () => {

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setDialogShow(false);
	};

	const confirmUpdateSprint = () => {

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setDialogShow(false);
	};

	const confirmDeleteSprint = () => {

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setAlertVisible(false);
		setDialogShow(false);
	}

	const cancelSprint = () => {

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setDialogShow(false);
	};


	/* 일감 목록 수정 모달창(tasksShow) */
	const onShowTasks = () => {

		setTasksShow(true);
	}

	const confirmTasks = () => {

		setTasksShow(false);
	};

	const cancelTasks = () => {

		setTasksShow(false);
	};


	/* 신규 백로그 추가 모달창(taskShow) */
	const onShowTask = () => {

		setTaskShow(true);
	}

	const confirmTask = () => {

		let changedBacklogs = [...newBacklogs];
		changedBacklogs.push({
			name: newBacklog.backlogTitle,
			type: 'newBacklog'
		});
		setNewBacklogs(changedBacklogs); // 생성/수정 모달에서 보여주기 위해
		
		newBacklogsObject.push(newBacklog);	// 생성/수정완료 시 API로 보내기 위해

		initTask();

		setTaskShow(false);
	};

	const cancelTask = () => {

		initTask();

		setTaskShow(false);
	};

	const onChangeNewBacklog = (e) => {

		setNewBacklog({
			...newBacklog,
			[e.target.name]: e.target.value
		});
	}

	const initTask = () => { // 신규 백로그 입력폼 비우기

		setNewBacklog({
			backlogTitle: '',
			backlogDescription: '',
			backlogStartDate: '',
			backlogEndDate: '',
			backlogUrgency: '보통',
			backlogIssue: 0,
			backlogChargerCode: '',
		});
	}

	const [selectedCities, setSelectedCities] = useState(null);

	const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

	const panelFooterTemplate = () => {
        const selectedItems = selectedOldBacklogs;
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
				{/* <span>{item} - (active) </span>
				<i className="pi pi-user-plus" style={{ fontSize: "14px" }}></i> */}
				<span>{item}</span>
			</div>
		);
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
								// onDelete={handleTaskDelete}
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
								todayColor="rgba(248, 96, 100, .2)"
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
				draggable={false}
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
                    </div>
					<div>
						<div>
							<div>
								<label>시작일</label>
								<Calendar 
									id="startDate" 
									name="sprintStartDate"
									value={sprint.sprintStartDate || ''} 
									showIcon
									onChange={(e) => onChangeSprint(e)}
								/>
							</div>
							<div>
								<label>종료일</label>
								<Calendar 
									id="endDate"
									name="sprintEndDate"
									value={sprint.sprintEndDate || ''} 
									showIcon
									onChange={(e) => onChangeSprint(e)}
								/>
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
							전체 일감 목록
							<Button 
								label="수정하기"
								style={{height: '20px', marginLeft: '20px', backgroundColor: 'rgba(0, 170, 156, .16)', border: '1px solid #333544', color: '#00AA9C'}}
								onClick={onShowTasks}
							/>
						</label>
						<Chips
							value={tasksSum.map((task) => task.name)}
							itemTemplate={customChip}
							readOnly={true}
						/>
					</div>
                </div>
            </Dialog>

			{/* 일감 목록 수정 모달창 */}
            <Dialog 
                visible={tasksShow} 
                style={{ width: '35vw', height: '75vh' }}
                onHide={cancelTasks}
				draggable={false}
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
						<label>
							일감 목록
						</label>
						{
							<Chips
								value={tasks.map((task) => task.name)}
								onChange={(e) => setTasks(e.value)}
								itemTemplate={customChip}
								style={{display: 'block'}}
							/>
						}
					</div>

                    <div>
                        <label>기존 백로그</label>
						<MultiSelect 
							className="multiselect-custom"
							value={selectedOldBacklogs} 
							options={oldBacklogs}
							onChange={(e) => {
								setSelectedOldBacklogs(e.value);
								onChangeSprint(e);
							}} 
							optionLabel="name" 
							display="chip"
							filter
							panelFooterTemplate={panelFooterTemplate} 
						/>
					</div>

					<div>
                        <label>
							신규 백로그
							<Button 
								label="추가하기"
								style={{height: '20px', marginLeft: '20px', backgroundColor: 'rgba(0, 170, 156, 0.16)', border: '1px solid #333544', color: '#00AA9C'}}
								// style={{height: '20px', marginLeft: '20px', backgroundColor: 'rgba(255, 185, 95, .16)', border: '1px solid #333544', color: '#FFB95F'}}
								onClick={onShowTask}
							/>
						</label>
						<Chips
							value={newBacklogs.map(newBacklog => newBacklog.name)}
							onChange={(e) => setNewBacklogs(e.value)}
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
				draggable={false}
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
                            name="backlogTitle"
                            value={newBacklog.backlogTitle || ''}
                            onChange={(e) => onChangeNewBacklog(e)}
                            placeholder="필수 입력 사항입니다."
                        />
                        {/* <InputText className="p-invalid block"/> */}
                        {/* <small className="p-error block">Username is not available.</small> */}
                    </div>
					<div>
                        <label>백로그 설명</label>
                        <InputText
                            name="backlogDescription"
                            value={newBacklog.backlogDescription || ''}
                            onChange={(e) => onChangeNewBacklog(e)}
							placeholder="백로그에 대한 설명을 입력해주세요."
                        />
                        {/* <InputText className="p-invalid block"/> */}
                        {/* <small className="p-error block">Username is not available.</small> */}
                    </div>
					<div>
                        <label>세부정보</label>
						<div id={GanttCss.backlogContainer}>

							<div id={GanttCss.backlogDetail}>
								<label>시작일</label>
								<label>종료일</label>
								<label>긴급도</label>
								<label>이슈여부</label>
								<label>담당자</label>
							</div>
							<div>
								<Calendar 
									name="backlogStartDate"
									value={newBacklog.backlogStartDate || ''} 
									showIcon
									onChange={(e) => onChangeNewBacklog(e)}
									placeholder="선택하지 않음"
								/>
								<Calendar 
									name="backlogEndDate"
									value={newBacklog.backlogEndDate || ''} 
									showIcon
									onChange={(e) => onChangeNewBacklog(e)}
									placeholder="선택하지 않음"
								/>
								<Dropdown 
									name="backlogUrgency"
									value={newBacklog.backlogUrgency} 
									options={options.urgency} 
									onChange={(e) => onChangeNewBacklog(e)}
									optionLabel="name" 
									placeholder="선택하지 않음" 
								/>
								<Dropdown 
									name="backlogIssue"
									value={newBacklog.backlogIssue} 
									options={options.issue} 
									onChange={(e) => onChangeNewBacklog(e)}
									optionLabel="name" 
									placeholder="선택하지 않음" 
								/>
								<Dropdown 
									name="backlogChargerCode"
									value={newBacklog.backlogChargerCode} 
									options={cities} 
									onChange={(e) => onChangeNewBacklog(e)}
									optionLabel="name" 
									placeholder="선택하지 않음"
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
				draggable={false}
            />

			{/* 테스트창 */}
			{/* <div
				style={{width: '20vw', height: '200px', backgroundColor: 'lightgreen', padding: '10px', color: 'black'}}
			>
				<h2>sprints</h2>
				<ul>
					{ sprints.map((sprint, index) => <li key={index}>{sprint.id}</li>)}
				</ul>
			</div> */}
		</>
	);
}

export default GanttChart;