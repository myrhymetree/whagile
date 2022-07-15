import React from "react";
import styles from "./task-list-header.module.css";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callGetBacklogsAPI } from '../../../apis/SprintAPICalls';

export const TaskListHeaderDefault = ({ headerHeight, fontFamily, fontSize, rowWidth, isChecked }) => {

	const sprints = useSelector(state => state.sprintsReducer);
	const backlogs = useSelector(state => state.sprintBacklogReducer);
	const counts = useSelector(state => state.sprintsCountReducer);
	const { projectCode } = useParams();
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(callGetBacklogsAPI({	// 스프린트 내 백로그 목록 조회
				offset: 0,
				limit: 1000,
				projectCode: projectCode
			}));
		},
		[]
	);

	return (
		<div
			className={styles.ganttTable}
			style={{
				fontFamily: fontFamily,
				fontSize: fontSize,
				minWidth: '360px',
				height: '44px',
				border: '1px solid grey',
				backgroundColor: '#282936',
			}}
		>
			<div
				className={styles.ganttTable_Header}
				style={{
					height: headerHeight - 2,
				}}
			>
				<div
					className={styles.ganttTable_HeaderItem}
					style={{
						minWidth: rowWidth,
					}}
				>
					<div className={styles.cells}>

						<i className="pi pi-folder" style={{marginRight: '5px'}}/>
						{/* 스프린트 · {sprints.filter(sprint => sprint.type === 'project').length} / */}
						스프린트 · {counts.sprintsCount} /
						
						<i className="pi pi-file" style={{margin: '0 5px'}}/>
						{/* 일감 · {sprints.filter(sprint => sprint.type === 'task').length} / */}
						일감 · {counts.tasksCount} /

						<i className="pi pi-file-excel" style={{margin: '0 5px'}}/>
						{/* 백로그 · {backlogs.length} */}
						백로그 · {counts.backlogsCount}

					</div>
				</div>
			</div>
		</div>
	);
};