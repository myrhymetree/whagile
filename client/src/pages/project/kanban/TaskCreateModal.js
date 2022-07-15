
import React, { useState } from "react";

import KanbanBoardStyle from "./KanbanBoard.module.css";
import EditTaskForm from "./EditTaskForm";
import { useParams } from 'react-router-dom';
import { decodeJwt } from "../../../utils/tokenUtils";


// 일감 모달창
export default function TaskCreateModal(props) {
	
	const { projectCode } = useParams();


	const [taskAll, setTaskAll] = useState({
		taskTitle: '',
		taskDescription: '',
		taskProgressStatus: '백로그',
		taskIssue: 0,
		taskUrgency: '보통',
		taskCharger: null,
	});




    const onChangeTask = (e) => {
      // 모달창 내용 변경시 감지
		setTaskAll({
			...taskAll,
			[e.target.name]: e.target.value,
		});

	};

	// submit 동작
	const onSubmit = async (event) => {
		const decoded = decodeJwt(window.localStorage.getItem("access_token"));
		const result = await fetch("http://localhost:8888/api/tasks", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			backlogTitle: taskAll.taskTitle,
			backlogDescription: taskAll.taskDescription,
			progressStatus: taskAll.taskProgressStatus,
			issue: taskAll.taskIssue,
			urgency: taskAll.taskUrgency,
			backlogChargerCode: taskAll.taskCharger,
			backlogCategory: (taskAll.taskProgressStatus === '백로그')? '백로그': '일감',
			sprintCode: decoded !== "undefined" ? decoded.code : "",
			projectCode: projectCode,
			backlogCreatorCode: decoded !== "undefined" ? decoded.code : "",
		}),
		})
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status == 200) {
          console.log("작동");
          window.location.reload();
        }
      });
		console.log('result: ', result);

	};

	const onClose = () => {
		setTaskAll({});
		props.onSubmit();
	};

	return (
		<Modal>
			<EditTaskForm
				onChangeTask={onChangeTask}
				taskAll={taskAll}
				onFormSubmit={onSubmit}
				onClose={onClose}
				category={props.category}
			/>
		</Modal>
	);
}

//모달 창
function Modal(props) {
	return (
		<>
			<div className={KanbanBoardStyle.kanbanModalScreen} />
			<div role="dialog" className={KanbanBoardStyle.kanbanModal}>
				{props.children}
			</div>
		</>
	);
}

