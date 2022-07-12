
import KanbanBoardStyle from "./KanbanBoard.module.css";
import EditTaskForm from "./EditTaskForm";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { POST_TASK } from "../../../modules/TaskModule";

//API, Redux
import callPostTaskAPI from "../../../apis/TaskAPICalls";

// 일감 모달창
export default function TaskCreateModal(props) {
  // 초기 폼
  const resetForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskProgressStatus("");
    setTaskIssue("");
    setTaskUrgency("");
    setTaskCharger("");
  };
  
  const dispatch = useDispatch();
  const task = useSelector((state) => state.taskReducer);
  const confirmInsertTask = () => {
        dispatch(callPostTaskAPI(task));
        onChangeTask();
  }


    const onChangeTask = async (e) => {
      // 모달창 내용 변경시 감지

      let paramTask = {
        ...task,
        [e.target.backlogTitle]: e.target.value,
        [e.target.backlogDescription]: e.target.value,
        [e.target.progressStatus]: e.target.value,
        [e.target.urgency]: e.target.value,
        [e.target.memberName]: e.target.value,
        [e.target.issue]: e.target.value,
      };

      dispatch({
        type: POST_TASK,
        payload: paramTask,
      });
    };


  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskProgressStatus, setTaskProgressStatus] = useState(null);
  const [taskIssue, setTaskIssue] = useState(null);
  const [taskUrgency, setTaskUrgency] = useState(null);
  const [taskCharger, setTaskCharger] = useState(null);


    
//       fetch("http://localhost:8888/api/tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Access-Token": window.localStorage.getItem("access_token"),
//         }})
//         .then((response) => response.json())
//         .then((json) => {
//             console.log(json);
//             const result = json.results[0];
//             console.log(result.backlogCode || "");
//             setTaskTitle(result.backlogTitle || "");
//             setTaskDescription(result.backlogDescription || "");
//             setTaskProgressStatus(result.progressStatus || "");
//             setTaskIssue(result.issue || "");
//             setTaskUrgency(result.urgency || "");
//             setTaskCharger(result.memberName || "");
//         });



// submit 동작
  const onSubmit = (event) => {
    if (props.type === "Create") {
      // 생성
      props.createTask(
        taskTitle,
        taskDescription,
        taskProgressStatus,
        taskIssue,
        taskUrgency,
        taskCharger
      );
    } else {
      //수정
      props.updateTask(
        props.currentTaskID,
        taskTitle,
        taskDescription,
        taskProgressStatus,
        taskIssue,
        taskUrgency,
        taskCharger
      );
    }
    event.preventDefault(); 
    if (props.type === "Create") {
      resetForm();
    }
    props.onSubmit();
  };

  const onClose = () => {
    resetForm();
    props.onSubmit();
  };

  return (
    <Modal>
      <EditTaskForm
        onTitleChange={(e) => confirmInsertTask(e)}
        currentDescription={taskDescription}
        onDescriptionChange={(e) => confirmInsertTask(e)}
        currentIssue={taskIssue}
        onIssueChange={(e) => confirmInsertTask(e)}
        currentUrgency={taskUrgency}
        onUrgencyChange={(e) => confirmInsertTask(e)}
        currentCharger={taskCharger}
        onChargerChange={(e) => confirmInsertTask(e)}
        currentProgressStatus={taskProgressStatus}
        onProgressStatusChange={(e) => confirmInsertTask(e)}
        onFormSubmit={onSubmit}
        onClose={onClose}
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

