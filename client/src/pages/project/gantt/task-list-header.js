import React from "react";
import styles from "./task-list-header.module.css";
import { useSelector, useDispatch } from 'react-redux';

export const TaskListHeaderDefault = ({ headerHeight, fontFamily, fontSize, rowWidth, isChecked }) => {

	const sprints = useSelector(state => state.sprintsReducer);

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
					{/* &nbsp;Name */}
					<div className={styles.cells}>
						<div>
							<i className="pi pi-folder" style={{marginRight: '10px'}}/>
							스프린트 : {sprints.filter(sprint => sprint.type === 'project').length}
						</div>
						<div>
							<i className="pi pi-file" style={{marginRight: '10px'}}/>
							백로그 : {sprints.filter(sprint => sprint.type === 'task').length}
						</div>
						{/* {sprints.filter(sprint => sprint.type === 'project').length}개의 스프린트와 {sprints.filter(sprint => sprint.type === 'task').length}개의 일감 */}
					</div>
				</div>
			</div>
		</div>
	);
};