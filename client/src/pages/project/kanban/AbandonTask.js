
import React from "react";
import KanbanBoardStyle from "./KanbanBoard.module.css";


  // 일감(백로그) 삭제
  export default function AbandonTask({ activeTask, deleteTask }) {
    const onDragOver = (event) => {
      event.preventDefault();
    };

    const onDrop = (event) => {
      if (activeTask != null) {
        deleteTask(activeTask);
      }
    };

    return (
      <div
        className={KanbanBoardStyle.kanbanBoxDeleteButton}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div>삭제할 백로그와 일감을 이곳으로 옮겨주세요</div>
      </div>
    );
  }


