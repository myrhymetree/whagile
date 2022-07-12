
import React from "react";
import { Category, Urgency } from "./Types";
import KanbanBoardStyle from "./KanbanBoard.module.css";

// 일감 모달 창 - 상세 조회 폼
export default function EditTaskForm({onChangeTask, taskAll, onFormSubmit, onClose}) {

	return (
    <div className={KanbanBoardStyle.kanbanModalContent}>
      <form onSubmit={onFormSubmit || ""}>
        <div className={KanbanBoardStyle.kanbanTitles}>상세 조회 및 수정</div>
        <div>
          <label
            htmlFor="input-title"
            className={KanbanBoardStyle.kanbanDetailTitle}
          >
            요약 *
          </label>
          <textarea
            name="taskTitle"
            className={KanbanBoardStyle.kanbanDetailInputTitle}
            id="input-title"
            placeholder="필수 입력 사항입니다."
            value={taskAll.taskTitle || ""}
            onChange={(event) => onChangeTask(event)}
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
            name="taskDescription"
            className={KanbanBoardStyle.kanbanDetailInputDescription}
            id="input-description"
            value={taskAll.taskDescription || ""}
            onChange={(event) => onChangeTask(event)}
          ></textarea>
        </div>
        <div className={KanbanBoardStyle.TaskOptions}>
          <select
            name="taskProgressStatus"
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-category"
            value={taskAll.taskProgressStatus || ""}
            onChange={(event) => onChangeTask(event)}
          >
            <option value={Category.Backlog}>백로그</option>
            <option value={Category.Before}>진행 전</option>
            <option value={Category.InProgress}>진행 중</option>
            <option value={Category.Done}>완료</option>
          </select>
          <select
            name="taskIssue"
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-issue"
            value={taskAll.taskIssue || ""}
            onChange={(event) => onChangeTask(event)}
          >
            <option value={0}>기본</option>
            <option value={1}>이슈</option>
          </select>

          <select
            name="taskUrgency"
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-urgency"
            value={taskAll.taskUrgency || ""}
            onChange={(event) => onChangeTask(event)}
          >
            <option value={Urgency.LowGrade}>낮음</option>
            <option value={Urgency.NormalGrade}>보통</option>
            <option value={Urgency.HighGrade}>긴급</option>
          </select>

          <select
            name="taskCharger"
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-charger"
            value={taskAll.taskCharger || ""}
            onChange={(event) => onChangeTask(event)}
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
            <input
              className={KanbanBoardStyle.saveButton}
              type="Submit"
              value="확인"
              readOnly={true}
            />
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
  );
}
