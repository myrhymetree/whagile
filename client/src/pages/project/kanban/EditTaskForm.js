
import React from "react";
import { Category, Issue, Urgency, Charger } from "./Types";

import KanbanBoardStyle from "./KanbanBoard.module.css";




// 일감 모달 창 - 상세 조회 폼
export default function EditTaskForm(props) {
  const {
    onFormSubmit,
    onTitleChange,
    currentTitle,
    onDescriptionChange,
    currentDescription,
    currentIssue,
    onIssueChange,
    currentUrgency,
    onUrgencyChange,
    currentCharger,
    onChargerChange,
    currentProgressStatus,
    onProgressStatusChange,
    onClose,
  } = props;

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
            className={KanbanBoardStyle.kanbanDetailInputTitle}
            id="input-title"
            placeholder="필수 입력 사항입니다."
            value={currentTitle || ""}
            onChange={(event) => onTitleChange(event.target.value)}
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
            value={currentDescription || ""}
            onChange={(event) => onDescriptionChange(event.target.value)}
          ></textarea>
        </div>
        <div className={KanbanBoardStyle.TaskOptions}>
          <select
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-category"
            value={currentProgressStatus || ""}
            onChange={(event) => {
              onProgressStatusChange(event.target.value);
            }}
          >
            <option value={Category.Backlog}>백로그</option>
            <option value={Category.Before}>진행 전</option>
            <option value={Category.InProgress}>진행 중</option>
            <option value={Category.Done}>완료</option>
          </select>
          <select
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-issue"
            value={currentIssue || ""}
            onChange={(event) => {
              onIssueChange(event.target.value);
            }}
          >
            <option value={Issue.Basic}>기본</option>
            <option value={Issue.Issue}>이슈</option>
          </select>

          <select
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-urgency"
            value={currentUrgency || ""}
            onChange={(event) => {
              onUrgencyChange(event.target.value);
            }}
          >
            <option value={Urgency.LowGrade}>낮음</option>
            <option value={Urgency.NormalGrade}>보통</option>
            <option value={Urgency.HighGrade}>긴급</option>
          </select>

          <select
            className={KanbanBoardStyle.kanbanDetailInputSelection}
            id="select-charger"
            value={currentCharger || ""}
            onChange={(event) => {
              onChargerChange(event.target.value);
            }}
          >
            <option value={Charger.Jin}>우진</option>
            <option value={Charger.Park}>성준</option>
            <option value={Charger.Joo}>민주</option>
            <option value={Charger.Sol}>한솔</option>
            <option value={Charger.Lee}>호성</option>
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
