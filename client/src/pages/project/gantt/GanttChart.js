// common, css
import PageTitle from '../../../components/items/PageTitle';
import 'gantt-task-react/dist/index.css';
import GanttCss from './GanttChart.module.css';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../../utils/tokenUtils';

// gantt-task-react
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import { ViewSwitcher } from './ViewSwitcher';
import { TaskListHeaderDefault } from './task-list-header';
import { TaskListTableDefault } from './task-list-table';
import { TooltipContentDefault } from './tooltip';
// import { initTasks, getStartEndDateForProject } from './helpers';

// apis, modules
import { callGetSprintsAPI, callGetSprintAPI, callPostSprintAPI, callPutSprintAPI, callDeleteSprintAPI, callGetTaskAPI, callUpdateTaskAPI } from '../../../apis/SprintAPICalls';
import { callGetProjectMemberAPI } from '../../../apis/ProjectAPICalls';
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
import { Tooltip } from 'primereact/tooltip';
import { MultiSelect } from 'primereact/multiselect';
import 'primeicons/primeicons.css';

function GanttChart() {

	const [view, setView] = useState(ViewMode.Day);
	const [isChecked, setIsChecked] = useState(true);
	let columnWidth = 48;
	if (view === ViewMode.Month) {
	  	columnWidth = 150;
	} else if (view === ViewMode.Week) {
	  	columnWidth = 120;
	}

	const sprints = useSelector(state => state.sprintsReducer);
	const counts = useSelector(state => state.sprintsCountReducer);
	const sprint = useSelector(state => state.sprintReducer);
	const backlogs = useSelector(state => state.sprintBacklogsReducer);
	const members = useSelector(state => state.projectMemberReducer);
	const sprintTask = useSelector(state => state.sprintTaskReducer);
	const dispatch = useDispatch();
	const { projectCode } = useParams();
	const [dialogShow, setDialogShow] = useState(false); // 모달창 ON/OFF
	const [dialogMode, setDialogMode] = useState('');   // 모달창 스프린트 생성/수정인지(insert, update)
	const [dialogTaskMode, setDialogTaskMode] = useState('');   // 모달창 스프린트 생성/수정인지(insert, update)
	const [alertVisible, setAlertVisible] = useState(false); // 스프린트 삭제 alert창 ON/OFF
	const [tasksShow, setTasksShow] = useState(false);
	const [taskShow, setTaskShow] = useState(false);
	const [tasks, setTasks] = useState([]); // api에서 불러온 일감 목록
	const [deletedTasks, setDeletedTasks] = useState([]); // 기존 일감 목록에서 삭제된 일감들
	const [oldBacklogs, setOldBacklogs] = useState([]); // 기존 백로그([{name, value, type}, ...])
	const [newBacklogs, setNewBacklogs] = useState([]); // 신규 백로그([{backlogTitle, backlogDescription...}, ...])
	const [selectedOldBacklogs, setSelectedOldBacklogs] = useState([]);	// 선택한 기존 백로그([{name, code, type}, ...])
	const [selectedNewBacklogs, setSelectedNewBacklogs] = useState([]); // 신규 백로그([{name, type}, ...])
	const [tasksSum, setTasksSum] = useState([]); // 일감 목록 + 기존 백로그 + 신규 백로그
	const [newBacklog, setNewBacklog] = useState({
		backlogTitle: '',
		backlogDescription: '',
		backlogStartDate: '',
		backlogEndDate: '',
		backlogUrgency: '보통',
		backlogIssue: 0,
		backlogChargerCode: '',
		backlogIssue: 0,
		backlogCode: '',
		backlogStartDate: '',
		backlogEndDate: '',
	});
	const [currentLimit, setCurrentLimit] = useState(10); // 간트차트에 보여줄 sprints 개수

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
			dispatch(callGetSprintsAPI({ // 스프린트 목록 조회
				projectCode: projectCode,
				isGantt: true,	// true일 경우, 진행 중 sprint가 맨위에 오고 진행 중이 아닌 sprint들은 sprintCode로 내림차순 정렬된다
				offset: 0,
				limit: currentLimit,
			}));

			dispatch(callGetProjectMemberAPI({ // 프로젝트 멤버 조회
				projectCode: projectCode
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
			setOldBacklogs(
				(Object.keys(backlogs).length > 0)
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
			
			allTasks = allTasks.concat(tasks, selectedOldBacklogs, selectedNewBacklogs);
			
			setTasksSum(allTasks);
		},
		[tasks, selectedOldBacklogs, selectedNewBacklogs]
	);
	
	useEffect(
		() => {
			
			setNewBacklog({
				backlogTitle: sprintTask.backlogTitle,
				backlogDescription: sprintTask.backlogDescription,
				backlogStartDate: (sprintTask.startDate)? new Date(sprintTask.startDate): '',
				backlogEndDate: (sprintTask.endDate)? new Date(sprintTask.endDate): '',
				backlogUrgency: sprintTask.urgency,
				backlogIssue: sprintTask.issue,
				backlogChargerCode: sprintTask.backlogChargerCode,
				backlogProgressStatus: sprintTask.progressStatus,
				backlogCategory: sprintTask.category,
				backlogCode: sprintTask.backlogCode,
			});
		},
		[sprintTask]
	);

	const getSprints = (limit) => {

		dispatch(callGetSprintsAPI({ // 스프린트 목록 조회
			projectCode: projectCode,
			isGantt: true,	// true일 경우, 진행 중 sprint가 맨위에 오고 진행 중이 아닌 sprint들은 sprintCode로 내림차순 정렬된다
			offset: 0,
			limit: limit,
		}));
	}

	const setBacklogs = () => {

		setOldBacklogs(
			(Object.keys(backlogs).length > 0)
			? backlogs.map((backlog) => {
				return {
					name: backlog.backlogTitle,
					code: backlog.backlogCode,
					type: 'oldBacklog'
				}
			})
			: []
		);
	}

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
  
	const handleDblClick = (task) => { // 간트차트 바 더블클릭 시
		
		if(task.type === 'project') {
			dispatch(callGetSprintAPI({	// 스프린트 단일 조회
				sprintCode: parseInt(task.id),
			}));

			onShowUpdate();
		}

		if(task.type === 'task') {
			dispatch(callGetTaskAPI({	// 일감 단일 조회
				taskCode: parseInt(task.id.slice(1)),
			}));
			
			onShowUpdateTask();
		}
		
		
	 	// console.log("On Double Click event Id:", task.id);
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


	/* 스프린트 생성/수정 모달창(dialogShow) */
	const onShowInsert = () => { // 새 스프린트 생성
		
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
		// setOldBacklogs([]);
		setSelectedOldBacklogs([]);
		setNewBacklogs([]);
		setSelectedNewBacklogs([]);
	}

	// 스프린트 생성 - 생성 버튼 
	const confirmInsertSprint = () => {

		const changedTasks = {
			oldBacklogs: simpleArrToObjectArr(selectedOldBacklogs, backlogs),
			newBacklogs: simpleArrToObjectArr(selectedNewBacklogs, newBacklogs),
		}
		
		const currentInfo = {
			projectCode: projectCode,
			backlogCreatorCode: decodeJwt(window.localStorage.getItem("access_token")).code
		}
		
		dispatch(callPostSprintAPI(sprint, changedTasks, currentInfo));

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setDialogShow(false);
	};

	// 스프린트 수정 - 수정 버튼 
	const confirmUpdateSprint = () => {

		const changedTasks = {
			// tasks: simpleArrToObjectArr(tasks, sprint.tasks),
			deletedTasks: deletedTasks,
			oldBacklogs: simpleArrToObjectArr(selectedOldBacklogs, backlogs),
			newBacklogs: simpleArrToObjectArr(selectedNewBacklogs, newBacklogs),
		}
		
		const currentInfo = {
			projectCode: projectCode,
			backlogCreatorCode: decodeJwt(window.localStorage.getItem("access_token")).code
		}

		dispatch(callPutSprintAPI(sprint, changedTasks, currentInfo));

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setDialogShow(false);
	};

	// 스프린트 삭제 alert창 - Yes 버튼 
	const confirmDeleteSprint = () => {

		dispatch(callDeleteSprintAPI(sprint.sprintCode, projectCode));

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setAlertVisible(false);
		setDialogShow(false);
	}

	// 스프린트 생성/수정 - 취소 버튼 
	const cancelSprint = () => {

		dispatch({type: INIT_SPRINT, payload: {}});

		initBacklogs();

		setDialogShow(false);
	};


	/* 일감 목록 수정 모달창(tasksShow) */
	const onShowTasks = () => {

		setTasksShow(true);
	}

	// 일감 목록 수정 확인 버튼
	const confirmTasks = () => {

		setTasksShow(false);
	};

	// 일감 목록 수정 취소 버튼
	const cancelTasks = () => {

		setTasksShow(false);
	};

	const onChangeTasks = (e) => { // x버튼으로 일감 목록 제거
		let afterTasks = e.target.value;
		
		let copyDeletedTasks = [...deletedTasks];
		copyDeletedTasks.push(tasks.filter((el) => !afterTasks.includes(el.name))[0].code);	//FIXME: 도움받은 코드임 filter사용법 알아보자
		setDeletedTasks(copyDeletedTasks);

		let copyTasks = [...tasks]; // 제거되기전 객체 배열 [{}, {}, ...]
		let copyEvent = [...e.value]; // 제거한 객체를 제외한 배열 [...]
		let changedTasks = []; 

		// TODO: 이름 중복이 허용이기 때문에 방법을 찾아야함
		// 중복된 이름은 제거가 안되는 현상이 있음
		for(let i = 0; i < copyTasks.length; i++) {
			
			for(let j = 0; j < copyEvent.length; j++) {

				if(copyTasks[i].name === copyEvent[j]) {

					changedTasks.push({
						name: copyTasks[i].name,
						code: copyTasks[i].code,
						type: copyTasks[i].type
					});
					
					break;
				}
			}
		}

		setTasks(changedTasks);
	}

	const onChangeNewBacklogs = (e) => { //x버튼으로 신규 백로그 제거
		
		let copyNewBacklogs = [...selectedNewBacklogs]; // 제거되기전 객체 배열 [{}, {}, ...]
		let copyEvent = [...e.value]; // 제거한 객체를 제외한 배열 [...]
		let changedNewBacklogs = []; 

		// TODO: 이름 중복이 허용이기 때문에 방법을 찾아야함
		// 중복된 이름은 제거가 안되는 현상이 있음
		for(let i = 0; i < copyNewBacklogs.length; i++) {
			
			for(let j = 0; j < copyEvent.length; j++) {

				if(copyNewBacklogs[i].name === copyEvent[j]) {

					changedNewBacklogs.push({
						name: copyNewBacklogs[i].name,
						type: copyNewBacklogs[i].type
					});
					
					break;
				}
			}
		}

		setSelectedNewBacklogs(changedNewBacklogs);
	}


	/* 신규 백로그 추가 모달창(taskShow) */
	const onShowInsertTask = () => {

		setNewBacklog({
			backlogTitle: '',
			backlogDescription: '',
			backlogStartDate: '',
			backlogEndDate: '',
			backlogUrgency: '보통',
			backlogIssue: 0,
			backlogChargerCode: '',
		});

		setDialogTaskMode('insert');

		setTaskShow(true);
	}

	const onShowUpdateTask = () => {
		
		setDialogTaskMode('update');

		setTaskShow(true);
	}

	// 신규 백로그 추가 확인 버튼
	const confirmInsertTask = () => {
		
		let changedBacklogs = [...selectedNewBacklogs];
		changedBacklogs.push({
			name: newBacklog.backlogTitle,
			type: 'newBacklog'
		});
		setSelectedNewBacklogs(changedBacklogs); // 생성/수정 모달에서 보여주기 위해
		
		let copyNewBacklogs = [...newBacklogs];
		copyNewBacklogs.push({ // 생성/수정완료 시 API로 보내기 위해
			...newBacklog,
			backlogStartDate: (newBacklog.backlogStartDate)? dateFormat(new Date(newBacklog.backlogStartDate), 'start'): '',
			backlogEndDate: (newBacklog.backlogEndDate)? dateFormat(new Date(newBacklog.backlogEndDate), 'end'): '',
		});
		setNewBacklogs(copyNewBacklogs);
		
		initTask();

		setTaskShow(false);
	};

	const confirmUpdateTask = () => {

		let changedBacklog = { // 일감 수정 완료 시 API로 보내기 위해
			...newBacklog,
			backlogStartDate: (newBacklog.backlogStartDate)? newBacklog.backlogStartDate: '',
			backlogEndDate: (newBacklog.backlogEndDate)? newBacklog.backlogEndDate: '',
		};

		dispatch(callUpdateTaskAPI(changedBacklog, projectCode));

		initTask();

		setTaskShow(false);
	};

	// 신규 백로그 추가 취소 버튼
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

	const panelFooterTemplate = () => { // 기존 백로그 선택 개수
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

	const customChip = (item) => { // 기존 일감 목록, 기존 백로그, 신규 백로그 chips 커스텀
		return (
			<div>
				<i className="pi pi-hashtag" style={{ fontSize: "12px", marginRight: "5px" }}></i>
				<span>{item}</span>
			</div>
		);
	};

	const simpleArrToObjectArr = (sArr, oArr) => {

		// backlogs				[{backlogTitle, backlogDescription...}, ...]		
		// oldBacklogs 			[{name, code, type}, ...]
		// selectedOldBacklogs	[{name, code, type}, ...]
		// -----------------------------------------------------------------
		// newBacklogs 			[{backlogTitle, backlogDescription...}, ...]
		// selectedNewBacklogs	[{name, type}, ...]

		let result = [];
		for(let i = 0; i < sArr.length; i++) {
			let matched = oArr.find(o => o.backlogTitle === sArr[i].name);
			result.push(matched);
		}

		return result;
	}

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
								onProgressChange={handleProgressChange}
								onDoubleClick={handleDblClick}
								onSelect={handleSelect}
								onExpanderClick={handleExpanderClick}
								barCornerRadius="5"
								barProgressColor="#BBBBBB"
								barProgressSelectedColor="#808080"
								headerHeight={36}
								rowHeight={32}
								// headerHeight="44"
								columnWidth={columnWidth}
								listCellWidth={isChecked ? "155px" : ""}
								todayColor="rgba(0, 170, 156, .1)"
								locale="kor"
								TaskListTable={TaskListTableDefault}
								TaskListHeader={TaskListHeaderDefault}
								TooltipContent={TooltipContentDefault}
							/>

							{
								(counts.sprintsCount > currentLimit) &&
								<div id={GanttCss.moreSprints}
									onClick={() => {
										setCurrentLimit(currentLimit + 10);
										getSprints(currentLimit + 10);
									}}
								>
									<i className="pi pi-angle-down" style={{width: '14px', height: '14px'}}/>
								</div>
							}
						</div>
					</>
					: <div id={GanttCss.emptySprint}>
						<i className="pi pi-chart-bar" style={{fontSize: '20em', transform: 'rotate(90deg)'}} />
						<h1>스프린트가 없습니다.</h1>
					</div>
				}
			</div>

			{/* 스프린트 생성/수정 모달창 */}
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
                                    : '생성'
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
				id={GanttCss.taskContainer}
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
                <div id={GanttCss.taskBody}>
					{
						(dialogMode === 'update') &&
						<div>
							<label>
								기존 일감 목록
								<Tooltip target=".tasks" />
								<i 
									className="tasks pi pi-info-circle"
									data-pr-tooltip={`이전부터 스프린트에 속해 있던 일감들의 목록입니다.
														\n일감 제거 시 해당 프로젝트의 백로그가 됩니다.`}
									data-pr-position="right" 
									data-pr-at="right+10 top" 
									data-pr-my="left center-2" 
									style={{ marginLeft: '10px', cursor: 'pointer' }}
								/>
							</label>
							{
								<Chips
									value={tasks.map((task) => task.name)}
									onChange={(e) => onChangeTasks(e)}
									itemTemplate={customChip}
									style={{display: 'block'}}
								/>
							}
						</div>
					}

                    <div>
                        <label>
							기존 백로그
							<Tooltip target=".oldBacklogs" />
							<i 
								className="oldBacklogs pi pi-info-circle"
								data-pr-tooltip="스프린트에 속해 있지 않고, 프로젝트 내에 있는 백로그들의 목록입니다" 
								data-pr-position="right" 
								data-pr-at="right+10 top" 
								data-pr-my="left center-2" 
								style={{ marginLeft: '10px', cursor: 'pointer' }}
							/>
						</label>
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
							<Tooltip target=".newBacklogs" />
							<i 
								className="newBacklogs pi pi-info-circle"
								data-pr-tooltip="새로운 백로그를 생성하고, 스프린트에 추가합니다" 
								data-pr-position="right" 
								data-pr-at="right+10 top" 
								data-pr-my="left center-2" 
								style={{ marginLeft: '10px', cursor: 'pointer' }}
							/>
							<Button 
								label="추가하기"
								style={{height: '20px', marginLeft: '20px', backgroundColor: 'rgba(0, 170, 156, 0.16)', border: '1px solid #333544', color: '#00AA9C'}}
								// style={{height: '20px', marginLeft: '20px', backgroundColor: 'rgba(255, 185, 95, .16)', border: '1px solid #333544', color: '#FFB95F'}}
								onClick={onShowInsertTask}
							/>
						</label>
						<Chips
							value={selectedNewBacklogs.map(newBacklog => newBacklog.name)}
							onChange={(e) => onChangeNewBacklogs(e)}
							itemTemplate={customChip}
							style={{display: 'block'}}
						/>

                    </div>
                </div>
            </Dialog>

			{/* 신규 백로그 추가 모달창 */}
            <Dialog 
                visible={taskShow} 
				position='right'
                style={{ width: '31vw', height: '75vh' }}
                onHide={cancelTask}
				draggable={false}
                header={ 
                    <h4>
						{
							(dialogTaskMode === 'insert')
							? '신규 백로그 추가'
							: '일감 수정'
						}
					</h4>
                }
                footer={
                    <div style={{marginTop: '20px'}}>
                        <Button 
                            label="확인"
                            icon="pi pi-check"
                            onClick={() =>
								(dialogTaskMode === 'insert')
								? confirmInsertTask()
								: confirmUpdateTask()
							}
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
                <div id={GanttCss.taskBody}>
					<div>
                        <label>백로그 제목</label>
                        <InputText
                            name="backlogTitle"
                            value={(newBacklog.backlogTitle)? newBacklog.backlogTitle: ''}
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
                            value={(newBacklog.backlogDescription)? newBacklog.backlogDescription: ''}
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
									value={(newBacklog.backlogStartDate)? newBacklog.backlogStartDate: ''} 
									onChange={(e) => onChangeNewBacklog(e)}
									placeholder="선택하지 않음"
									showIcon
								/>
								<Calendar 
									name="backlogEndDate"
									value={(newBacklog.backlogEndDate)? newBacklog.backlogEndDate: ''} 
									onChange={(e) => onChangeNewBacklog(e)}
									placeholder="선택하지 않음"
									showIcon
								/>
								<Dropdown 
									name="backlogUrgency"
									value={(newBacklog.backlogUrgency)? newBacklog.backlogUrgency: '보통'} 
									options={options.urgency} 
									onChange={(e) => onChangeNewBacklog(e)}
									optionLabel="name" 
									placeholder="선택하지 않음" 
								/>
								<Dropdown 
									name="backlogIssue"
									value={(newBacklog.backlogIssue)? newBacklog.backlogIssue: 0} 
									options={options.issue} 
									onChange={(e) => onChangeNewBacklog(e)}
									optionLabel="name" 
									placeholder="선택하지 않음" 
								/>
								<Dropdown 
									name="backlogChargerCode"
									value={(newBacklog.backlogChargerCode)? newBacklog.backlogChargerCode: null} 
									options={ 
										[{
											name: '선택하지 않음', 
											value: null
										}].concat(members.map(member => {
												return {
													name: member.memberName,
													value: member.memberCode
												}
											})
										)
									}
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
                header="스프린트 삭제" 
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
			</div>
			<div
				style={{width: '20vw', height: '200px', backgroundColor: 'lightgreen', padding: '10px', color: 'black'}}
			>
				<h2>sprintTask</h2>
				<ul>
					<li>{ sprintTask.backlogCode }</li>
					<li>{ sprintTask.backlogTitle }</li>
					<li>{ sprintTask.backlogDescription }</li>
					<li>{ sprintTask.issue }</li>
					<li>{ sprintTask.urgency }</li>
				</ul>
			</div>
			<div
				style={{width: '20vw', height: '200px', backgroundColor: 'lightyellow', padding: '10px', color: 'black'}}
			>
				<h2>newBacklog</h2>
				<ul>
					<li>{ newBacklog.backlogCode }</li>
					<li>{ newBacklog.backlogTitle }</li>
					<li>{ newBacklog.backlogDescription }</li>
					<li>{ newBacklog.issue }</li>
					<li>{ newBacklog.urgency }</li>
				</ul>
			</div> */}
		</>
	);
}

function dateFormat(date, when) { // Fri Jul 01 2022 00:00:00 GMT+0900 (한국 표준시) 형식을 '2022-07-01 00:00:00'으로 바꿔줌
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    if(when === 'start') {
        return date.getFullYear() + '-' + month + '-' + day  + 'T00:00:00.000Z';
    }

    if(when === 'end') {
        return date.getFullYear() + '-' + month + '-' + day  + 'T23:59:59.000Z';
    }
}

export default GanttChart;