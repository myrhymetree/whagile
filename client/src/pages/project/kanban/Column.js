import TaskModal from "./TaskModal";
import React, { useState } from "react";
import KanbanBoardStyle from "./KanbanBoard.module.css";
import createTask from "./KanbanBoard";
import TaskCreateModal from "./TaskCreateModal";

 // 일감 생성 버튼
function NewTaskButton(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div>
        <button
          className={KanbanBoardStyle.kanbanBoxAddButton}
          onClick={(e) => {
            setShowModal(true);
          }}
        >
          +
        </button>
      </div>
      {showModal && (
        <TaskCreateModal
          type="Create"
          createTask={props.createTask}
          onSubmit={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}



// 일감 상세 조회 및 수정버튼
function EditButton(props) {
  // 일감 수정 요청


  return (
    <div
      role="button"
      className={KanbanBoardStyle.kanbanEditAndDetailButton}
      onClick={props.onClick}
    >
      ≡
    </div>
  );
}

// 칸반 개별 일감들(박스)
function KanbanBox(props) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={KanbanBoardStyle.kanbanBox}
        onDragStart={(event) => {
          props.onDragStart(props.data.backlogCode, event);
        }}
        draggable="true"
      >
        {props.data.backlogTitle}
        <EditButton
          onClick={(event) => {
            //상위 엘리먼트 이벤트 전파 중단
            event.stopPropagation();
            setShowModal(true);
          }}
        ></EditButton>
      </div>
      {showModal && (
        <TaskModal
          type="Edit"
          onSubmit={() => {
            setShowModal(false);
          }}
          updateTask={props.updateTask}
          currentTaskID={props.data.backlogCode}
        />
      )}
    </>
  );
}


export function KanbanColumn(props) {
  return (
    <>
      <div
        className={KanbanBoardStyle.kanbanColumn}
        onDragOver={props.onDragOver}
        onDrop={props.onDrop}
      >
        <div>
          <h2 className={KanbanBoardStyle.kanbanColumnTitle}>
            {props.category}
          </h2>
          {props.data &&
            props.data.map((task) => (
              <KanbanBox
                key={task.backlogCode}
                data={task}
                onDragStart={props.KanbanBox.onDragStart}
                updateTask={props.KanbanBox.updateTask}
              />
            ))}
        </div>
        <div className={KanbanBoardStyle.kanbanNewTaskButtonDiv}>
          <NewTaskButton createTask={createTask} />
        </div>
      </div>
    </>
  );
}
