
import KanbanBoardStyle from "./KanbanBoard.module.css";
import EditTaskForm from "./EditTaskForm";
import React, { useState} from "react";


// 일감 모달창
export default function TaskModal(props) {
  // 초기 폼
  const resetForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskProgressStatus("");
    setTaskIssue("");
    setTaskUrgency("");
    setTaskCharger("");
  };

  // 개별 일감 상세 조회
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskProgressStatus, setTaskProgressStatus] = useState("");
  const [taskIssue, setTaskIssue] = useState("");
  const [taskUrgency, setTaskUrgency] = useState("");
  const [taskCharger, setTaskCharger] = useState("");

  console.log(props.currentTaskID);
  fetch(`http://localhost:8888/api/tasks/${props.currentTaskID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Access_token: window.localStorage.getItem("access_token"),
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const result = json.results[0];
      console.log(result.backlogCode || "");
      setTaskTitle(result.backlogTitle || "");
      setTaskDescription(result.backlogDescription || "");
      setTaskProgressStatus(result.progressStatus || "");
      setTaskIssue(result.issue || "");
      setTaskUrgency(result.urgency || "");
      setTaskCharger(result.memberName || "");
    });



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
    event.preventDefault(); //이벤트 동작 중지
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
        currentTitle={taskTitle}
        onTitleChange={(e) => setTaskTitle(e)}
        currentDescription={taskDescription}
        onDescriptionChange={(e) => setTaskDescription(e)}
        currentIssue={taskIssue}
        onIssueChange={(e) => setTaskIssue(e)}
        currentUrgency={taskUrgency}
        onUrgencyChange={(e) => setTaskUrgency(e)}
        currentCharger={taskCharger}
        onChargerChange={(e) => setTaskCharger(e)}
        currentProgressStatus={taskProgressStatus}
        onProgressStatusChange={(e) => setTaskProgressStatus(e)}
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
