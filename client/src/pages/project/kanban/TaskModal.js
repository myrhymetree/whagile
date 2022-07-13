import KanbanBoardStyle from "./KanbanBoard.module.css";

import React, { useEffect, useState } from "react";
import { Category, Urgency } from "./Types";


// 일감 모달창
export default function TaskModal(props) {

  // 개별 일감 상세 조회
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskProgressStatus, setTaskProgressStatus] = useState("");
  const [taskIssue, setTaskIssue] = useState("");
  const [taskUrgency, setTaskUrgency] = useState("");
  const [taskCharger, setTaskCharger] = useState("");

  useEffect(() => {
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
        setTaskIssue(result.issue);
        setTaskUrgency(result.urgency || "");
        setTaskCharger(result.backlogChargerCode || "");
      });
  }, [props.currentTaskID]);

  



  const onClose = () => {
    props.onSubmit();
  };
  

  const onTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const onProgressStatusChange = (e) => {
    setTaskProgressStatus(e.target.value);
  };

  const onIssueChange = (e) => {
    setTaskIssue(e.target.value);
  };

  const onUrgencyChange = (e) => {
    setTaskUrgency(e.target.value);
  };

  const onChargerChange = (e) => {
    console.log(e.target.value);
    setTaskCharger(e.target.value);
  };

  const onClickSubmitHandler = async () => {


    const kanbanInfo = {
      backlogCode: props.currentTaskID,
      backlogTitle: taskTitle,
      backlogDescription: taskDescription,
      progressStatus: taskProgressStatus,
      issue: taskIssue,
      urgency: taskUrgency,
      backlogChargerCode: taskCharger,
    };

    console.log("kanban", kanbanInfo);
    await fetch(
      `http://localhost:8888/api/tasks`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          kanbanInfo,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("login error: " + err);
      });
  };

  return (
    <>
      <div className={KanbanBoardStyle.kanbanModalScreen} />
      <div role="dialog" className={KanbanBoardStyle.kanbanModal}>
        <div className={KanbanBoardStyle.kanbanModalContent}>

          <form>
            <div className={KanbanBoardStyle.kanbanTitles}>
              상세 조회 및 수정
            </div>
            <div>
              <label
                htmlFor="input-title"
                className={KanbanBoardStyle.kanbanDetailTitle}
              >
                요약 *
              </label>
              <textarea
                className={KanbanBoardStyle.kanbanDetailInputTitle}
                id="input-title"
                placeholder="필수 입력 사항입니다."
                value={taskTitle || ""}
                onChange={(e) => onTitleChange(e)}
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="input-textarea"
                className={KanbanBoardStyle.kanbanDetailDescription}
              >
                설명
              </label>
              <textarea
                className={KanbanBoardStyle.kanbanDetailInputDescription}
                id="input-description"
                value={taskDescription}
                onChange={(e) => onDescriptionChange(e)}
              ></textarea>
            </div>
            <div className={KanbanBoardStyle.TaskOptions}>
              <select
                className={KanbanBoardStyle.kanbanDetailInputSelection}
                id="select-category"
                value={taskProgressStatus}
                onChange={(e) => onProgressStatusChange(e)}
              >
                <option value={Category.Backlog}>백로그</option>
                <option value={Category.Before}>진행 전</option>
                <option value={Category.InProgress}>진행 중</option>
                <option value={Category.Done}>완료</option>
              </select>
              <select
                className={KanbanBoardStyle.kanbanDetailInputSelection}
                id="select-issue"
                value={taskIssue}
                onChange={(e) => {
                  onIssueChange(e);
                }}
              >
                <option value={0}>기본</option>
                <option value={1}>이슈</option>
              </select>

              <select
                className={KanbanBoardStyle.kanbanDetailInputSelection}
                id="select-urgency"
                value={taskUrgency}
                onChange={(e) => onUrgencyChange(e)}
              >
                <option value={Urgency.LowGrade}>낮음</option>
                <option value={Urgency.NormalGrade}>보통</option>
                <option value={Urgency.HighGrade}>긴급</option>
              </select>

              <select
                className={KanbanBoardStyle.kanbanDetailInputSelection}
                id="select-charger"
                value={taskCharger}
                onChange={(e) => onChargerChange(e)}
              >
                <option value={1}>우진</option>
                <option value={2}>성준</option>
                <option value={3}>민주</option>
                <option value={4}>한솔</option>
                <option value={5}>호성</option>
              </select>
            </div>

            <div className={KanbanBoardStyle.kanbanDetailButton}>
              <div>
                <button
                  type="button"
                  className={KanbanBoardStyle.saveButton}
                  onClick={onClickSubmitHandler}
                >
					저장
				</button>
                <button
                  className={KanbanBoardStyle.cancelButton}
                  type="button"
                  onClick={onClose}
                >
                	취소
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
